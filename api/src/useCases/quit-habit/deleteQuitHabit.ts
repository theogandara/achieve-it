import { Request, Response } from 'express';
import { QuitHabit } from '../../app/QuitHabit';

export async function deleteQuitHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await QuitHabit.findByIdAndDelete(id);

    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}
