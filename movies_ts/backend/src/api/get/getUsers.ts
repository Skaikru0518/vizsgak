import { IUsers } from '../../interface/IUsers';
import { db } from '../db';
import { Request, Response } from 'express';

export async function getUsers(req: Request, res: Response): Promise<any> {
  try {
    await db.connect();
    const [users]: IUsers[] = await db.query('SELECT * FROM users');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error });
  } finally {
    db.disconnect();
  }
}
