import express from 'express';
import { getGames } from './routes/index.js';

const router = express.Router();

// get
router.get('/games', getGames);

export default router;
