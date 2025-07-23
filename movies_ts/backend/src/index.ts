import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './api/routes';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: `Server error: ${err}` });
});

app.listen(PORT, () => {
  console.log(`App listening on https://localhost:${PORT}`);
});
