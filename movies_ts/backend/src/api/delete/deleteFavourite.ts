import { db } from '../db';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function deleteFavourite(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const id = req.params.id as string;
  const authHeader = req.headers['authorization'];
  const token =
    typeof authHeader === 'string'
      ? authHeader.replace('Bearer ', '')
      : undefined;

  try {
    await db.connect();
    if (!token) {
      return next('Unauthenticated');
    }
    if (!id) {
      return next('Movie id is missing or not found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const [deletedFavourite]: any = await db.query(
      'DELETE FROM favourites WHERE user_id = ? AND movie_id = ?',
      [decoded?.id, id],
    );

    if (!deletedFavourite.affectedRows || deletedFavourite.affectedRows === 0) {
      return next('Error when deleting favourite movie');
    }

    return res.status(200).json({ message: 'Favourite deleted' });
  } catch (error: any) {
    return next('Error deleting favourite');
  } finally {
    await db.disconnect();
  }
}
