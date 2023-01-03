import express from 'express';

import { create, findAll, deleteLike } from '../controllers/likes.controller';

const router = express.Router();

router.post('/', create);
router.get('/:commentId', findAll);
router.delete('/', deleteLike);

export default router;
