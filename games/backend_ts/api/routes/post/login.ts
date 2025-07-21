import { pool } from '../../config/db';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    if (!username || !password) {
      return res.status(404).json({ error: 'Missing one or more parameters' });
    }

    const [isUser] = await pool.query<RowDataPacket[]>(
      'SELECT id, username, email FROM users WHERE username = ?',
      [username],
    );

    if ((isUser as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = (isUser as RowDataPacket[])[0];

    const [userPassRows] = await pool.query<RowDataPacket[]>(
      'SELECT password FROM users WHERE username = ?',
      [user.username],
    );

    const isValidPass = await bcrypt.compare(
      password,
      (userPassRows as RowDataPacket[])[0].password,
    );

    if (!isValidPass) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET as string,
      { expiresIn: '1h' },
    );

    return res.status(200).json({ token, user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error' });
  }
};
