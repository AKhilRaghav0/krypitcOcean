import { Router } from 'express';
import sshRoutes from './ssh';
import terminalRoutes from './terminal';
import fileRoutes from './files';
import authRoutes from './auth';
import configRoutes from './config';

export function setupRoutes(): Router {
  const router = Router();

  // Health check for API
  router.get('/health', (req, res) => {
    res.json({
      success: true,
      message: 'KrypticOcean API is running',
      timestamp: new Date().toISOString()
    });
  });

  // Route modules
  router.use('/auth', authRoutes);
  router.use('/ssh', sshRoutes);
  router.use('/terminal', terminalRoutes);
  router.use('/files', fileRoutes);
  router.use('/config', configRoutes);

  return router;
} 
import sshRoutes from './ssh';
import terminalRoutes from './terminal';
import fileRoutes from './files';
import authRoutes from './auth';
import configRoutes from './config';

export function setupRoutes(): Router {
  const router = Router();

  // Health check for API
  router.get('/health', (req, res) => {
    res.json({
      success: true,
      message: 'KrypticOcean API is running',
      timestamp: new Date().toISOString()
    });
  });

  // Route modules
  router.use('/auth', authRoutes);
  router.use('/ssh', sshRoutes);
  router.use('/terminal', terminalRoutes);
  router.use('/files', fileRoutes);
  router.use('/config', configRoutes);

  return router;
} 
import sshRoutes from './ssh';
import terminalRoutes from './terminal';
import fileRoutes from './files';
import authRoutes from './auth';
import configRoutes from './config';

export function setupRoutes(): Router {
  const router = Router();

  // Health check for API
  router.get('/health', (req, res) => {
    res.json({
      success: true,
      message: 'KrypticOcean API is running',
      timestamp: new Date().toISOString()
    });
  });

  // Route modules
  router.use('/auth', authRoutes);
  router.use('/ssh', sshRoutes);
  router.use('/terminal', terminalRoutes);
  router.use('/files', fileRoutes);
  router.use('/config', configRoutes);

  return router;
} 