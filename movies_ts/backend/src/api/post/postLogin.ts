import { db } from '../db';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUsers } from '../../interface/IUsers';

export async function postLogin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const { username, password } = req.body;
  try {
    await db.connect();
    const [userLogin]: [IUsers[]] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
    );

    if (userLogin.length === 0) {
      return next('Login error, username not found');
    }

    const user: IUsers = userLogin[0];

    const toAuth = await bcrypt.compare(password, user.password);

    if (!toAuth) {
      return next('Username or password is invalid');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET as string,
    );

    return res.status(200).json({
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return next(error instanceof Error ? error.message : error);
  } finally {
    await db.disconnect();
  }
}
