import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function validateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, 'SECRET_KEY');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
