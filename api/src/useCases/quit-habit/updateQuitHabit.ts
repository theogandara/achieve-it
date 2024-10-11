import { Request, Response } from 'express';
import { QuitHabit } from '../../app/QuitHabit';

export async function updateQuitHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, icon, lastTime } = req.body;
    const quitHabit = await QuitHabit.findByIdAndUpdate(id, {
      name,
      icon,
      lastTime,
    });
    if (!quitHabit) {
      return res.status(404).json({ message: 'Quit habit not found' });
    }
    return res.json(quitHabit);
  } catch (error) {
    return res.sendStatus(500);
  }
}
