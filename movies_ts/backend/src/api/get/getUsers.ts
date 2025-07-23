import { IUsers } from '../../interface/IUsers';
import { db } from '../db';
import { Request, Response, NextFunction } from 'express';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  try {
    await db.connect();
    const [users]: [IUsers[]] = await db.query('SELECT * FROM users');
    return res.status(200).json(users);
  } catch (error: any) {
    return next(error);
  } finally {
    db.disconnect();
  }
}
