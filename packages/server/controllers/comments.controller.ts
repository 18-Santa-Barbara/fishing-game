import type { Request, Response } from 'express';
import { Comments } from '../db';

export const create = (req: Request, res: Response) => {
  const {postId, author, body, date, comment} = req.body;

  Comments.create({ postId, author, body, date, comment })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating a comment.',
      });
    });
};

export const findAll = (req: Request, res: Response) => {
  const {postId} = req.params;

  Comments.findAll({ where: { postId } })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting all comments.',
      });
    });
};
