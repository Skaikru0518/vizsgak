import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { IFavourites } from '../../interface/IFavourites';

export async function getFavourites(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const id = req.params.id as string;
  try {
    await db.connect();

    if (id) {
      const [favouritesById]: [IFavourites[]] = await db.query(
        'SELECT * FROM favourites WHERE user_id = ?',
        [id],
      );
      if (favouritesById.length === 0) {
        return next('No favourites found with this user id!');
      }
      return res.status(200).json(favouritesById);
    }

    const [favourites]: [IFavourites[]] = await db.query(
      'SELECT * FROM favourites',
    );
    return res.status(200).json(favourites);
  } catch (error: any) {
    return next(error);
  } finally {
    await db.disconnect();
  }
}
