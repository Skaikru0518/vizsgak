import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
console.log('DATABASE USER', process.env.DB_USR);
const createDBPool = () => {
  try {
    const pool = mysql2.createPool({
      host: process.env.DB_URI,
      user: process.env.DB_USR,
      password: process.env.DB_PASS,
      database: 'v_movies',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('DB pool created');
    return pool;
  } catch (error) {
    console.error('DB pool error:', error.message || error.code);
    throw error.message;
  }
};

export default createDBPool;
