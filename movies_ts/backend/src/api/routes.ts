import express from 'express';
import { getFavourites, getMovies, getUsers } from './get';
import { postLogin, postMakeFavourite, postRegister } from './post';

const router = express.Router();

//get
router.get('/movies', getMovies);
router.get('/users', getUsers);
router.get('/favourites/', getFavourites);
router.get('/favourites/:id', getFavourites);

//post
router.post('/login', postLogin);
router.post('/register', postRegister);
router.post('/favourites/:id', postMakeFavourite);

export default router;
