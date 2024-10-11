import { Request, Response } from 'express';
import { DailyTemplate } from '../../app/DailyTemplate';
import { getEmailFromToken } from '../../service/getEmailFromToken';

export async function createDailyTemplate(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const email = getEmailFromToken(authHeader.split(' ')[1]);
    const { items } = req.body;
    const dailyTemplates = await DailyTemplate.find({ email });
    if (dailyTemplates.length > 0) {
      await DailyTemplate.deleteMany({
        email: email,
      });
    }

    const dailyTemplate = await DailyTemplate.create({
      items,
      email: email,
    });

    return res.status(201).json(dailyTemplate);
  } catch (error) {
    return res.sendStatus(500);
  }
}
