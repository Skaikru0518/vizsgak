import { Database } from '../class/database';
import dotenv from 'dotenv';
dotenv.config();

export const db = new Database(
  `${process.env.DB_URI}`,
  `${process.env.DB_DB}`,
  `${process.env.DB_USR}`,
  `${process.env.DB_PASS}`,
);
