import express from 'express';
import { getMovies, getUsers } from './get';

const router = express.Router();

router.get('/movies', getMovies);
router.get('/users', getUsers);

export default router;
