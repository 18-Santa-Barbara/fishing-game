import express from 'express';

import {changeThemeById, getThemeById} from '../controllers/theme.controller';

const router = express.Router();

// получение темы по id юзера
router.get('/:userId', getThemeById);

// обновить тему юзера
router.put('', changeThemeById);

// удалить запись по userID
// router.delete('/:userID', themeController.deleteOne);

// // обновить запись по id пользователя
// router.put('/:userID', themeController.update);

// // создать запись
// router.put('/', themeController.createTHemeRow);

// // получить все записи
// router.get('/', themeController.getAll);

// //удалить все записи
// router.delete('/', themeController.deleteAll);

export default router;