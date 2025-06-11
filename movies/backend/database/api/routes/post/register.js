import createDBPool from '../../../db.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const pool = createDBPool();
    const [isUsernameUsed] = await pool.query(
      'SELECT username FROM users WHERE username = ?',
      [username],
    );
    if (isUsernameUsed.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const [isEmailUsed] = await pool.query(
      'SELECT email FROM users WHERE email = ?',
      [email],
    );
    if (isEmailUsed.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
    );
    return res
      .status(201)
      .json({ message: 'Register success', username: username, email: email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
