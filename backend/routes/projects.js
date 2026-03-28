import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// In-memory store (replace with database in production)
let projects = [
  {
    id: 1,
    title: 'Midnight Echoes',
    category: 'Cinematic Film',
    description: 'A cinematic short exploring the echoes of memory through light and shadow.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
    videoUrl: '',
    year: '2024',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Velocity',
    category: 'Commercial',
    description: 'High-energy automotive commercial with precision editing.',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    videoUrl: '',
    year: '2024',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
];

// GET all projects (public)
router.get('/', (req, res) => {
  const { category, featured } = req.query;
  let result = [...projects];

  if (category) result = result.filter((p) => p.category === category);
  if (featured) result = result.filter((p) => p.featured);

  res.json(result);
});

// GET single project (public)
router.get('/:id', (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

// POST new project (protected)
router.post('/', authenticateToken, (req, res) => {
  const project = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  projects.push(project);
  res.status(201).json(project);
});

// PUT update project (protected)
router.put('/:id', authenticateToken, (req, res) => {
  const index = projects.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  projects[index] = { ...projects[index], ...req.body };
  res.json(projects[index]);
});

// DELETE project (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const index = projects.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  projects.splice(index, 1);
  res.json({ message: 'Deleted' });
});

export default router;
