import { Router } from 'express';

const router = Router();

// Placeholder terminal routes
router.post('/create', (req, res) => {
  res.json({
    success: true,
    message: 'Terminal creation endpoint - implementation pending'
  });
});

router.get('/sessions', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Terminal sessions retrieved successfully'
  });
});

export default router; 