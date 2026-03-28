import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

let messages = [];

// POST submit contact form (public)
router.post('/', (req, res) => {
  const { name, email, project, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    project,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);
  res.status(201).json({ success: true });
});

// GET all messages (protected)
router.get('/', authenticateToken, (req, res) => {
  res.json(messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// PUT mark as read (protected)
router.put('/:id/read', authenticateToken, (req, res) => {
  const msg = messages.find((m) => m.id === Number(req.params.id));
  if (!msg) return res.status(404).json({ error: 'Not found' });
  msg.read = true;
  res.json(msg);
});

// DELETE message (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  messages = messages.filter((m) => m.id !== Number(req.params.id));
  res.json({ message: 'Deleted' });
});

export default router;
