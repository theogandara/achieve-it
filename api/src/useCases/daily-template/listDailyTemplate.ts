import { Request, Response } from 'express';
import { DailyTemplate } from '../../app/DailyTemplate';
import { getEmailFromToken } from '../../service/getEmailFromToken';

export async function listDailyTemplate(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const email = getEmailFromToken(authHeader.split(' ')[1]);
    const dailyTemplates = await DailyTemplate.find({
      email,
    });
    return res.json(dailyTemplates);
  } catch (error) {
    return res.sendStatus(500);
  }
}
