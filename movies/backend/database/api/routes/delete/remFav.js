import createDBPool from '../../../db.js';
import jwt from 'jsonwebtoken';

export const removeFavourite = async (req, res) => {
  const { username } = req.body;
  const movieId = req.params.id;
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1]; //bearer: token

  try {
    if (!token || !username) {
      return res.status(401).json({ error: 'Unauthorized' });
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

    if (userId.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user_id = parseInt(userId[0].id);

    const [removedMovie] = await pool.query(
      'DELETE FROM favourites WHERE user_id = ? AND movie_id = ?',
      [user_id, movieId],
    );

    if (removedMovie.affectedRows === 0) {
      return res.status(404).json({ error: 'Movie not found in favourites' });
    }

    return res
      .status(200)
      .json({ message: 'Movie deleted successfully from favourites' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
