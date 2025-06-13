import createDBConnection from '../../../database/db.js';

export const getGames = async (req, res) => {
  try {
    const pool = createDBConnection();
    const [games] = await pool.query('SELECT * FROM games');
    return res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
    throw new Error(`Error fetching games from database: ${error.message}`);
  }
};
