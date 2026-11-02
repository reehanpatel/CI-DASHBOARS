const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Generate unique filename preserving extension (e.g. .mp4)
function createUniqueFilename(originalName, mimeType) {
  let ext = path.extname(originalName || '');
  if (!ext) {
    if (mimeType && mimeType.includes('mp4')) ext = '.mp4';
    else if (mimeType && mimeType.includes('quicktime')) ext = '.mov';
    else if (mimeType && mimeType.includes('webm')) ext = '.webm';
    else if (mimeType && mimeType.includes('pdf')) ext = '.pdf';
    else if (mimeType && mimeType.includes('png')) ext = '.png';
    else if (mimeType && (mimeType.includes('jpeg') || mimeType.includes('jpg'))) ext = '.jpg';
    else ext = '';
  }
  const cleanName = path.basename(originalName || 'upload', ext).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 80);
  return `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${cleanName}${ext}`;
}

// Helper to authenticate stream requests (via header or query)
async function authenticateRequest(req) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : (req.query.token || null);
    if (!token) return null;

    const secret = process.env.JWT_SECRET || 'ci360-super-secret-jwt-key-2026';
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    if (user && user.active) return user;
    return null;
  } catch {
    return null;
  }
}

// Raw binary stream upload handler (supports heavy MP4 videos, 1GB+, 2GB+, without Node memory buffering)
async function streamUploadHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = await authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required for uploading files' });
  }

  try {
    const rawName = req.query.name || req.headers['x-file-name'] || 'video.mp4';
    let originalName = 'upload.mp4';
    try {
      originalName = decodeURIComponent(rawName);
    } catch {
      originalName = rawName;
    }

    const mimeType = req.query.type || req.headers['x-file-type'] || req.headers['content-type'] || 'video/mp4';
    const uniqueName = createUniqueFilename(originalName, mimeType);
    const filePath = path.join(uploadsDir, uniqueName);

    const writeStream = fs.createWriteStream(filePath);
    let bytesReceived = 0;

    req.on('data', (chunk) => {
      bytesReceived += chunk.length;
    });

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      const fileData = {
        name: originalName,
        filename: uniqueName,
        url: `/uploads/${uniqueName}`,
        size: bytesReceived,
        type: mimeType,
        uploadedBy: user.name || 'User',
        uploadedAt: new Date()
      };

      res.status(200).json({
        success: true,
        file: fileData,
        files: [fileData]
      });
    });

    writeStream.on('error', (err) => {
      console.error('File stream write error:', err);
      try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch {}
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to write upload stream: ' + err.message });
      }
    });

    req.on('aborted', () => {
      writeStream.destroy();
      try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch {}
    });

    req.on('error', (err) => {
      console.error('File stream request error:', err);
      writeStream.destroy();
      try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch {}
      if (!res.headersSent) {
        res.status(500).json({ error: 'Upload stream interrupted: ' + err.message });
      }
    });
  } catch (err) {
    console.error('Upload stream handler error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to handle upload stream: ' + err.message });
    }
  }
}

// POST /api/upload/stream
router.post('/stream', streamUploadHandler);

// POST /api/upload - Backwards compatible JSON/base64 upload for small files
router.post('/', async (req, res) => {
  const user = await authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const rawFiles = req.body.files || (req.body.file ? [req.body.file] : []);
    if (!rawFiles || !rawFiles.length) {
      return res.status(400).json({ error: 'No files provided for upload' });
    }

    const uploaded = [];

    for (const f of rawFiles) {
      const originalName = f.name || `file_${Date.now()}`;
      const uniqueName = createUniqueFilename(originalName, f.type);
      const filePath = path.join(uploadsDir, uniqueName);

      let buffer = null;
      if (f.base64) {
        const matches = f.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const dataStr = matches ? matches[2] : f.base64;
        buffer = Buffer.from(dataStr, 'base64');
      } else if (f.data) {
        const matches = f.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const dataStr = matches ? matches[2] : f.data;
        buffer = Buffer.from(dataStr, 'base64');
      }

      if (buffer) {
        await fs.promises.writeFile(filePath, buffer);
        uploaded.push({
          name: originalName,
          filename: uniqueName,
          url: `/uploads/${uniqueName}`,
          size: buffer.length || f.size || 0,
          type: f.type || 'application/octet-stream',
          uploadedBy: user.name || 'User',
          uploadedAt: new Date()
        });
      } else if (f.url) {
        uploaded.push({
          name: originalName,
          url: f.url,
          size: f.size || 0,
          type: f.type || 'application/octet-stream',
          uploadedBy: user.name || 'User',
          uploadedAt: new Date()
        });
      }
    }

    res.json({
      success: true,
      files: uploaded,
      file: uploaded[0] || null
    });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'Failed to process file upload: ' + err.message });
  }
});


// Dedicated video/file streaming route with full HTTP 206 Partial Content & Range request support (for heavy 400MB - 1GB+ MP4 videos)
router.get('/file/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  const ext = path.extname(filename).toLowerCase();
  let contentType = 'application/octet-stream';
  if (ext === '.mp4') contentType = 'video/mp4';
  else if (ext === '.mov') contentType = 'video/quicktime';
  else if (ext === '.webm') contentType = 'video/webm';
  else if (ext === '.pdf') contentType = 'application/pdf';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

  res.setHeader('Accept-Ranges', 'bytes');

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
      return;
    }

    const chunksize = (end - start) + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    });
    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

router.streamUploadHandler = streamUploadHandler;

module.exports = router;
