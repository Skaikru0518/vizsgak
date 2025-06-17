// protected

import createDBConnection from '../../../database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const getOwnedGames = async (req, res) => {
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const decodedUser = jwt.decode(token);

    const pool = createDBConnection();

    const [userId] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [decodedUser],
    );

    if (!userId.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [userGames] = await pool.query(
      'SELECT * FROM games WHERE owner = ?',
      [userId[0].id],
    );

    res.status(200).json(userGames);
  } catch (error) {
    console.error('Error:', error);

    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(500).json({ error: error.message });
  }
};
