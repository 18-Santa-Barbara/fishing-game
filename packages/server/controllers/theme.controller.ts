import type { Request, Response } from 'express';
import { Theme } from '../db';

export const getThemeById = (req: Request, res: Response) => {
  const { userId } = req.params;
  return Theme.findOne({
    where: { userId },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(501).send({
        message: err.message || 'Error while getting theme!',
      });
    });
}