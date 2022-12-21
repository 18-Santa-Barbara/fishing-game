import type { Request, Response } from 'express';
import { Theme } from '../db';

export const getThemeById = (req: Request, res: Response) => {
  const { userId } = req.params;
  return Theme.findOrCreate({
    where: { userId },
  })
    .then(([data]) => {
      res.send(data);
    })
    .catch(err => {
      res.status(501).send({
        message: err.message || 'Error while getting theme!',
      });
    });
};

export const changeThemeById = (req: Request, res: Response) => {
  const { userId, isDark } = req.body;
  return Theme.update(
    { isDark },
    {
      where: { userId },
    }
  )
    .then(() => {
      res.send(JSON.stringify(req.body));
    })
    .catch(err => {
      res.status(501).send({
        message: err.message || 'Error while changing theme!',
      });
    });
};
