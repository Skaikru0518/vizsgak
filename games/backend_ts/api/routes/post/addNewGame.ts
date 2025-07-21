import { pool } from '../../config/db';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET;

interface Decodeduser {
  id?: number;
  username?: string;
  email?: string;
}

export const addNewGame = async (req: Request, res: Response) => {
  const { token, dev, name, price, cover } = req.body;
  const newGame = {
    developer: dev,
    name: name,
    price: price,
    cover: cover,
  };
  try {
    if (!JWT_SECRET) {
      return res.status(401).json({ error: 'JWT not set' });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as Decodeduser;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const [result] = await pool.query<RowDataPacket[]>(
      'INSERT INTO games (owner, developer, name, price, cover) VALUES (?,?,?,?,?)',
      [
        decoded.id,
        newGame.developer,
        newGame.name,
        newGame.price,
        newGame.cover,
      ],
    );

    if ((result as RowDataPacket[]).length === 0) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.json({ message: 'Success', newGame });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Could not add new game' });
    }
    return res.status(500).json({ error: 'Unknown error' });
  }
};
