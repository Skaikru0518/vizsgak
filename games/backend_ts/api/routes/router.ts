import express from 'express';
import { testRoute } from './get';

const router = express.Router();

router.get('/test', testRoute);

export default router;
