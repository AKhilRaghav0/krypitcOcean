import { Router } from 'express';

const router = Router();

// Placeholder SSH routes
router.get('/connections', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'SSH connections retrieved successfully'
  });
});

router.post('/connect', (req, res) => {
  res.json({
    success: true,
    message: 'SSH connection endpoint - implementation pending'
  });
});

export default router; 