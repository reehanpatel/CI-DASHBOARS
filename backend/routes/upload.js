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

// Comprehensive extension-to-mime and mime-to-extension dictionary supporting all file formats
const EXT_MIME_MAP = {
  // Video formats
  '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm',
  '.mkv': 'video/x-matroska', '.avi': 'video/x-msvideo', '.m4v': 'video/x-m4v',
  '.3gp': 'video/3gpp', '.wmv': 'video/x-ms-wmv', '.flv': 'video/x-flv',
  '.ts': 'video/mp2t', '.ogv': 'video/ogg',
  // Audio formats
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4', '.flac': 'audio/flac', '.aac': 'audio/aac', '.wma': 'audio/x-ms-wma',
  // Image formats
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.bmp': 'image/bmp', '.ico': 'image/x-icon', '.tiff': 'image/tiff', '.tif': 'image/tiff',
  '.heic': 'image/heic', '.heif': 'image/heif', '.psd': 'image/vnd.adobe.photoshop',
  // Documents & Office formats
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.csv': 'text/csv',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.txt': 'text/plain',
  '.rtf': 'application/rtf',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  // Archives & Compressed
  '.zip': 'application/zip',
  '.rar': 'application/vnd.rar',
  '.7z': 'application/x-7z-compressed',
  '.tar': 'application/x-tar',
  '.gz': 'application/gzip',
  // Design, 3D & Creative
  '.ai': 'application/postscript',
  '.eps': 'application/postscript',
  '.fig': 'application/octet-stream',
  '.sketch': 'application/octet-stream',
  '.blend': 'application/x-blender',
  '.obj': 'model/obj',
  '.fbx': 'application/octet-stream',
  '.xd': 'application/octet-stream',
  // Code & Data
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.sql': 'text/plain',
  '.md': 'text/markdown'
};

const MIME_EXT_MAP = {};
for (const [ext, mime] of Object.entries(EXT_MIME_MAP)) {
  if (!MIME_EXT_MAP[mime]) MIME_EXT_MAP[mime] = ext;
}

// Generate unique filename preserving original file extension for any format
function createUniqueFilename(originalName, mimeType) {
  let ext = path.extname(originalName || '').toLowerCase();
  if (!ext && mimeType) {
    const cleanMime = mimeType.split(';')[0].trim().toLowerCase();
    ext = MIME_EXT_MAP[cleanMime] || '';
  }
  const baseOnly = path.basename(originalName || 'file', ext);
  const cleanName = baseOnly.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 80) || 'upload';
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
    const user = await User.findById(payload.id).select('name role active').lean();
    if (user && user.active !== false) return user;
    return null;
  } catch {
    return null;
  }
}

// Raw binary stream upload handler (ultra-fast, supports any file type: MP4 videos, images, docs up to 1GB+)
async function streamUploadHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = await authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required for uploading files' });
  }

  try {
    const rawName = req.query.name || req.headers['x-file-name'] || 'file.bin';
    let originalName = 'upload.bin';
    try {
      originalName = decodeURIComponent(rawName);
    } catch {
      originalName = rawName;
    }

    const mimeType = req.query.type || req.headers['x-file-type'] || req.headers['content-type'] || 'application/octet-stream';
    const uniqueName = createUniqueFilename(originalName, mimeType);
    const filePath = path.join(uploadsDir, uniqueName);

    // 1MB buffer for high-throughput write performance on local disk and cloud drives
    const writeStream = fs.createWriteStream(filePath, { highWaterMark: 1024 * 1024 });

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      const bytesReceived = writeStream.bytesWritten || 0;
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
  const contentType = EXT_MIME_MAP[ext] || 'application/octet-stream';

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
