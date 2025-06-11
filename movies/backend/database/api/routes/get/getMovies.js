import createDBPool from '../../../db.js';

export const getMovies = async (req, res) => {
  try {
    const pool = createDBPool();
    const [rows] = await pool.query('SELECT * FROM movies');
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
