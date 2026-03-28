import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

let settings = {
  hero: {
    line1: "I DON'T EDIT VIDEOS",
    line2: 'I CREATE EXPERIENCES',
    subtitle: 'Cinematic Video Editor — Crafting Visual Stories That Move People',
    videoUrl: '',
  },
  about: {
    description: 'I believe every frame tells a story...',
    milestones: [],
  },
  services: [],
  animations: {
    smoothScroll: true,
    heroAnimation: true,
    scrollTrigger: true,
    cursorEffects: true,
    filmGrain: true,
    parallax: true,
    textReveal: true,
    reduceMotion: false,
    preloader: true,
  },
};

// GET settings (public)
router.get('/', (req, res) => {
  res.json(settings);
});

// GET specific section
router.get('/:section', (req, res) => {
  const section = settings[req.params.section];
  if (!section) return res.status(404).json({ error: 'Section not found' });
  res.json(section);
});

// PUT update settings (protected)
router.put('/:section', authenticateToken, (req, res) => {
  if (!settings[req.params.section] && req.params.section !== 'hero') {
    return res.status(404).json({ error: 'Section not found' });
  }
  settings[req.params.section] = { ...settings[req.params.section], ...req.body };
  res.json(settings[req.params.section]);
});

export default router;
