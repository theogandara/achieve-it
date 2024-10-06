import { Request, Response } from 'express';
import { QuitHabit } from '../../app/QuitHabit';

export async function listQuitHabit(req: Request, res: Response) {
  try {
    const quitHabits = await QuitHabit.find();
    return res.json(quitHabits);
  } catch (error) {
    return res.sendStatus(500);
  }
}
