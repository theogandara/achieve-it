import { Request, Response } from 'express';
import { User } from '../../app/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: email }, 'SECRET_KEY', {
      expiresIn: '24h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}
