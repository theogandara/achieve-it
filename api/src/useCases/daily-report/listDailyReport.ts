import { Request, Response } from 'express';
import { DailyReport } from '../../app/DailyReport';
import { getEmailFromToken } from '../../service/getEmailFromToken';

export async function listDailyReport(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const email = getEmailFromToken(authHeader.split(' ')[1]);
    const dailyReport = await DailyReport.find({
      email,
    });

    if (!dailyReport) {
      return res.status(404).json({ message: 'Daily report not found' });
    }

    return res.status(200).json(dailyReport);
  } catch (error) {
    return res.sendStatus(500);
  }
}
