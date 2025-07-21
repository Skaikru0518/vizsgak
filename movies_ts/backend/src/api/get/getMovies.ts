import { IMoives } from '../../interface/IMovies';
import { db } from '../db';
import { Request, Response } from 'express';

export async function getMovies(req: Request, res: Response): Promise<any> {
  try {
    await db.connect();
    const [movies]: IMoives[] = await db.query('SELECT * FROM movies');
    return res.status(200).json(movies);
  } catch (error: any) {
    return res.status(500).json({ error: error });
  } finally {
    await db.disconnect();
  }
}
