import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './api/routes/router.ts';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on : ${PORT}`);
});
