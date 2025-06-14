import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../../shared/types';

export interface AuthRequest extends Request {
  user?: User;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.'
    });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as { user: User };
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token.'
    });
  }
}

export function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(token, secret) as { user: User };
      req.user = decoded.user;
    } catch (error) {
      // Token is invalid, but we don't reject the request
      console.warn('Invalid token provided:', error);
    }
  }

  next();
} 
import jwt from 'jsonwebtoken';
import { User } from '../../../shared/types';

export interface AuthRequest extends Request {
  user?: User;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.'
    });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as { user: User };
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token.'
    });
  }
}

export function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(token, secret) as { user: User };
      req.user = decoded.user;
    } catch (error) {
      // Token is invalid, but we don't reject the request
      console.warn('Invalid token provided:', error);
    }
  }

  next();
} 
import jwt from 'jsonwebtoken';
import { User } from '../../../shared/types';

export interface AuthRequest extends Request {
  user?: User;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.'
    });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as { user: User };
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token.'
    });
  }
}

export function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(token, secret) as { user: User };
      req.user = decoded.user;
    } catch (error) {
      // Token is invalid, but we don't reject the request
      console.warn('Invalid token provided:', error);
    }
  }

  next();
} 