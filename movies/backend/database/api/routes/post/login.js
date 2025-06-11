import createDBPool from '../../../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = createDBPool();
    const [rows] = await pool.query(
      'SELECT id, username, password FROM users WHERE username = ?',
      [username],
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials, no user found' });
    }

    const user = rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      userId: user.id,
      username: user.username,
      token: token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};
