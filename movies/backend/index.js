import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './database/api/router.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend running on: ${PORT}`);
});
