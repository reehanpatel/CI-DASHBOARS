const express = require('express');
const fs = require('fs');
const path = require('path');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// POST /api/upload - Accepts one or more files in base64 format or Data URIs
router.post('/', verifyToken, async (req, res) => {
  try {
    const rawFiles = req.body.files || (req.body.file ? [req.body.file] : []);
    if (!rawFiles || !rawFiles.length) {
      return res.status(400).json({ error: 'No files provided for upload' });
    }

    const uploaded = [];

    for (const f of rawFiles) {
      const originalName = f.name || `file_${Date.now()}`;
      const ext = path.extname(originalName) || '';
      const cleanName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${cleanName}${ext}`;
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
          uploadedBy: req.user ? req.user.name : 'User',
          uploadedAt: new Date()
        });
      } else if (f.url) {
        // Already hosted or remote URL
        uploaded.push({
          name: originalName,
          url: f.url,
          size: f.size || 0,
          type: f.type || 'application/octet-stream',
          uploadedBy: req.user ? req.user.name : 'User',
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

module.exports = router;
