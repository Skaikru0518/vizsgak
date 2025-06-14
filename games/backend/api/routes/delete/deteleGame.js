//protected

import createDBConnection from '../../../database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const deleteGame = async (req, res) => {
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];
  const gameId = req.params.id;
  try {
    const pool = createDBConnection();

    let decodedUser;
    jwt.verify(token, process.env.JWT_SECRET, (err, deoded) => {
      if (err) {
        console.error('Error verifying token', err.message);
        return res.status(401).json({ error: 'Invalid token' });
      }
      decodedUser = jwt.decode(token);
    });

    const [userId] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [decodedUser],
    );

    const [deleteGame] = await pool.query(
      'DELETE FROM games WHERE id = ? AND owner = ?',
      [gameId, userId[0].id],
    );

    if (deleteGame.affectedRows === 0) {
      return res.status(500).json({ error: `Could not delete game` });
    }

    return res.status(200).json({ message: 'Succesfully deleted the game!' });
  } catch (error) {
    console.error('Error deleting game', error.message);
    res.status(500).json({ error: error.message });
  }
};
