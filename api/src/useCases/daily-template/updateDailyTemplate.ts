import { Request, Response } from 'express';
import { DailyTemplate } from '../../app/DailyTemplate';
import { DailyReport } from '../../app/DailyReport';
import { getEmailFromToken } from '../../service/getEmailFromToken';

export async function updateDailyTemplate(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const email = getEmailFromToken(authHeader.split(' ')[1]);

    const { id } = req.params;
    const { items } = req.body;

    const dailyTemplate = await DailyTemplate.findByIdAndUpdate(id, {
      items,
    });

    if (!dailyTemplate) {
      return res.sendStatus(404);
    }

    const dailyReport = await DailyReport.findOne({
      email,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (dailyReport) {
      dailyReport.items = items.map((item: { name: string }) => ({
        name: item.name,
        done: false,
      }));
      await dailyReport.save();
    }

    return res.json(dailyTemplate);
  } catch (error) {
    return res.sendStatus(500);
  }
}
