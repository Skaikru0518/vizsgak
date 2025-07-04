import { pool } from '../../config/db.ts';
import { Request, Response } from 'express';

export const testRoute = async (req: Request, res: Response) => {
  try {
    const [games] = await pool.query('SELECT * FROM games');
    res.status(200).json(games);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: 'Unknown server error' });
  }
};
