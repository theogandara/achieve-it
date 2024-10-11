import { Request, Response } from 'express';
import { DailyReport } from '../../app/DailyReport';
import { DailyTemplate } from '../../app/DailyTemplate';
import { getEmailFromToken } from '../../service/getEmailFromToken';

export async function showDailyReport(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const email = getEmailFromToken(authHeader.split(' ')[1]);
    const dailyReport = await DailyReport.find({
      email,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (dailyReport.length === 0) {
      const dailyTemplate = await DailyTemplate.findOne({
        email,
      });

      if (!dailyTemplate) {
        const defaultItems = [
          { name: 'Drink water' },
          { name: 'Read a book' },
          { name: 'Exercise' },
          { name: 'Meditate' },
        ];

        const dailyReport = await DailyReport.create({
          email,
          items: defaultItems.map((item) => ({
            name: item.name,
            done: false,
          })),
        });

        return res.status(200).json({
          email: dailyReport.email,
          items: dailyReport.items,
          id: dailyReport.id,
        });
      }

      const daily = await DailyReport.create({
        email,
        items: dailyTemplate.items.map((item) => ({
          name: item.name,
          done: false,
        })),
      });

      return res.status(200).json({
        email: daily.email,
        items: daily.items,
        id: daily.id,
      });
    }

    return res.status(200).json(
      dailyReport.map((report) => ({
        email: report.email,
        items: report.items,
        id: report.id,
      }))[0]
    );
  } catch (error) {
    return res.sendStatus(500);
  }
}
