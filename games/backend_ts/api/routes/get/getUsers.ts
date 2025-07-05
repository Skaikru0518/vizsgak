import { pool } from '../../config/db.ts';
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const [users] = await pool.query('SELECT id, username, email FROM users');
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: 'Unknown error' });
  }
};
