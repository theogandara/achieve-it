import { Request, Response } from 'express';
import { DailyTemplate } from '../../app/DailyTemplate';

export async function updateDailyTemplate(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const dailyTemplate = await DailyTemplate.findByIdAndUpdate(id, {
      items,
    });

    if (!dailyTemplate) {
      return res.sendStatus(404);
    }

    return res.json(dailyTemplate);
  } catch (error) {
    return res.sendStatus(500);
  }
}
