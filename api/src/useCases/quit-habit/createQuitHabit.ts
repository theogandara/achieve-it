import { Request, Response } from 'express';
import { QuitHabit } from '../../app/QuitHabit';
import { getEmailFromToken } from '../../service/getEmailFromToken';

export async function createQuitHabit(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const email = getEmailFromToken(authHeader.split(' ')[1]);

    const { name, icon, lastTime } = req.body;
    const quitHabit = await QuitHabit.create({
      name,
      icon,
      lastTime,
      email,
    });
    return res.status(201).json(quitHabit);
  } catch (error) {
    return res.sendStatus(500);
  }
}
