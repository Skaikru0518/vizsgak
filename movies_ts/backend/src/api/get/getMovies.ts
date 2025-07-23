import { IMoives } from '../../interface/IMovies';
import { db } from '../db';
import { Request, Response, NextFunction } from 'express';

export async function getMovies(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  try {
    await db.connect();
    const [movies]: [IMoives[]] = await db.query('SELECT * FROM movies');
    return res.status(200).json(movies);
  } catch (error: any) {
    return next(error);
  } finally {
    await db.disconnect();
  }
}
