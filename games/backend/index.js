import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './api/router.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Express runing on ${PORT}`);
});
