import createDBConnection from '../../../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const login = async (req, res) => {
  const { username, password } = req.body;
  dotenv.config();
  try {
    const pool = createDBConnection();

    const [isUser] = await pool.query(
      'SELECT username FROM users WHERE username = ?',
      [username],
    );

    if (isUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [userPassword] = await pool.query(
      'SELECT password FROM users WHERE username = ?',
      [isUser[0].username],
    );

    const comparedPasswrods = await bcrypt.compare(
      password,
      userPassword[0].password,
    );

    if (!comparedPasswrods) {
      return res
        .status(401)
        .json({ error: 'Username or password is incorrect' });
    }

    const token = jwt.sign(username, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ message: 'Success', token: token, username: username });
  } catch (error) {
    console.error('Error in login process', error.message);
    return res.status(500).json({ error: error.message });
  }
};
