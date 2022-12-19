import express from 'express';

import { create, findAll } from '../controllers/comments.controller';

const router = express.Router();

router.post('/', create);
router.get('/', findAll);

export default router;
