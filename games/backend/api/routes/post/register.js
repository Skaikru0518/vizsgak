import createDBConnection from '../../../database/db.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const pool = createDBConnection();

    if (!username || !password || !email) {
      return res
        .status(404)
        .json({ error: 'Either username, email or password is missing' });
    }

    const [isCredsUsed] = await pool.query(
      'SELECT COUNT(*) FROM users WHERE username = ? OR email = ? ',
      [username, email],
    );

    if (isCredsUsed[0].count > 0) {
      return res.status(409).json({ error: 'Username or email already used' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const [newUser] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?,?,?)',
      [username, email, hashedPassword],
    );

    return res
      .status(201)
      .json({ message: 'User created', username: username, email: email });
  } catch (error) {
    console.error('Error registering new user:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
