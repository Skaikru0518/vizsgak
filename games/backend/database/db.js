import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const createDBConnection = () => {
  try {
    const pool = mysql2.createPool({
      host: process.env.DB_URI,
      user: process.env.DB_USR,
      password: process.env.DB_PASS,
      database: 'games',
      connectionLimit: 10,
    });
    console.log('DB Pool created!');
    return pool;
  } catch (error) {
    console.error('Error creating DB pool!');
    throw new Error('Error creating DB pool');
  }
};

export default createDBConnection;
