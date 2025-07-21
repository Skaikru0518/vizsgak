import express from 'express';
import { getGames, getUsers } from './get';
import { addNewGame, login } from './post';

const router = express.Router();

router.get('/test', getGames);
router.get('/users', getUsers);

router.post('/login', login);
router.post('/newgame', addNewGame);

export default router;
