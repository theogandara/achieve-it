import jwt from 'jsonwebtoken';

export function getEmailFromToken(token: string | undefined) {
  if (!token) {
    throw new Error('Token not found');
  }

  const decoded = jwt.verify(token, 'SECRET_KEY') as { email: string };

  return decoded.email;
}
