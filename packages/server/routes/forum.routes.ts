import express from 'express';

import { create, findAll } from '../controllers/forum.controller';

const router = express.Router();

router.post('/', create);
router.get('/', findAll);

export default router;
