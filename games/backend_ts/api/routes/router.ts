import express from 'express';
import { getGames, getUsers } from './get';

const router = express.Router();

router.get('/test', getGames);
router.get('/users', getUsers);

export default router;
