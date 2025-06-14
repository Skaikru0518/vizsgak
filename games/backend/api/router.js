import express from 'express';
import {
  addNewGame,
  getGames,
  login,
  register,
  deleteGame,
  getOwnedGames,
} from './routes/index.js';

const router = express.Router();

// get
router.get('/games', getGames);
router.get('/owned_games', getOwnedGames);

//post
router.post('/register', register);
router.post('/login', login);
router.post('/addgame', addNewGame);

//delete
router.delete('/delete/:id', deleteGame);

export default router;
