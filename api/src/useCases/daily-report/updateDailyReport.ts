import { Request, Response } from 'express';
import { DailyReport } from '../../app/DailyReport';

export async function updateDailyReport(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { items } = req.body;
    const dailyReport = await DailyReport.findByIdAndUpdate(id, { items });

    if (!dailyReport) {
      return res.status(404).json({ message: 'Daily report not found' });
    }

    return res.json(dailyReport);
  } catch (error) {
    return res.sendStatus(500);
  }
}
