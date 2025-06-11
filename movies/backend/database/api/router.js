import express from 'express';
import {
  getFavourites,
  getMovies,
  login,
  makeFav,
  register,
  removeFavourite,
} from './routes/index.js';
const router = express.Router();

//get
router.get('/movies', getMovies);
router.get('/favourites', getFavourites);

//post
router.post('/login', login);
router.post('/register', register);
router.post('/favourites/:id', makeFav);

//delete
router.delete('/favourites/:id', removeFavourite);

export default router;
