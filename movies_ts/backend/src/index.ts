import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './api/routes';

dotenv.config();
const PORT = process.env.PORT || 3030;

const app = express();
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App listening on https://localhost:${PORT}`);
});
