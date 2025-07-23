import { db } from '../db';
import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function postRegister(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const { username, email, password } = req.body;
  try {
    await db.connect();
    if (!username || !email || !password) {
      return next('One or more required field is missing');
    }

    const [checkUsername] = await db.query(
      'SELECT * FROM users WHERE username = ? or email = ?',
      [username, email],
    );

    if (checkUsername.length > 0) {
      return next('Username or email is already in use');
    }

    const hashedPassword: string = await bcrypt.hash(password, 12);

    const [createUser]: any = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
    );

    if (!createUser.affectedRows || createUser.affectedRows === 0) {
      return next('Something went wrong with the register process. DB error');
    }

    const token = jwt.sign(
      { id: createUser.insertId, username: username, email: email },
      process.env.JWT_SECRET as string,
    );

    return res.status(201).json({
      id: createUser.insertId,
      username,
      email,
      token,
    });
  } catch (error: any) {
    console.log('Error during register process:', error);
    return next(error instanceof Error ? error.message : error);
  } finally {
    await db.disconnect();
  }
}
