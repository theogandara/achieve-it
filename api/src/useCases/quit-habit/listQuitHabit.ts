import { Request, Response } from 'express';
import { QuitHabit } from '../../app/QuitHabit';
import { getEmailFromToken } from '../../service/getEmailFromToken';

export async function listQuitHabit(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const email = getEmailFromToken(authHeader.split(' ')[1]);
    const quitHabits = await QuitHabit.find({ email });
    return res.json(quitHabits);
  } catch (error) {
    return res.sendStatus(500);
  }
}
