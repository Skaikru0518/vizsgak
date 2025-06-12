import createDBPool from '../../../db.js';
import jwt from 'jsonwebtoken';

export const getFavourites = async (req, res) => {
  const { username } = req.query;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token || !username) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    if (decoded.username !== username) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const pool = createDBPool();
    const [userId] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username],
    );

    const selectedUserId = userId[0].id;

    const [favs] = await pool.query(
      `
      SELECT movies.*
      FROM favourites
      INNER JOIN movies ON favourites.movie_id = movies.id
      WHERE favourites.user_id = ?
      `,
      [selectedUserId],
    );
    if (favs.length === 0) {
      return res.status(200).json({ message: 'No favourites' });
    }

    return res.status(200).json(favs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
