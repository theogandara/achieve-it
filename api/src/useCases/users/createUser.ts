import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../app/User';
import { DailyTemplate } from '../../app/DailyTemplate';

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({ email, password: hashedPassword });

    await DailyTemplate.create({
      email,
      items: [
        {
          name: 'Wake up at 5:59',
        },
      ],
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
}
