import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|webm|avi/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
});

let mediaFiles = [];

// POST upload file (protected)
router.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const media = {
    id: Date.now(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`,
    createdAt: new Date().toISOString(),
  };

  mediaFiles.push(media);
  res.status(201).json(media);
});

// GET all media (protected)
router.get('/', authenticateToken, (req, res) => {
  res.json(mediaFiles);
});

// DELETE media (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const media = mediaFiles.find((m) => m.id === Number(req.params.id));
  if (!media) return res.status(404).json({ error: 'Not found' });

  // Remove file from disk
  const filePath = path.join(uploadDir, media.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  mediaFiles = mediaFiles.filter((m) => m.id !== Number(req.params.id));
  res.json({ message: 'Deleted' });
});

export default router;
