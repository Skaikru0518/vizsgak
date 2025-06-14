//protected

import createDBConnection from '../../../database/db.js';
import jwt from 'jsonwebtoken';

export const addNewGame = async (req, res) => {
  const { token, dev, name, price, cover } = req.body;
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

    const owner = userId[0].id;
    const [addGame] = await pool.query(
      'INSERT INTO games (owner, developer, name, price, cover) VALUES (?,?,?,?,?)',
      [owner, dev, name, price, cover],
    );

    if (addGame.affectedRows === 0) {
      return res
        .status(500)
        .json({ error: `Could not add game to ${decodedUser}` });
    }

    return res
      .status(200)
      .json({ message: `Game added succesfully to: ${decodedUser}` });
  } catch (error) {
    console.error('Error adding new game to user', error.message);
    return res.status(500).json({ error: error.message });
  }
};
