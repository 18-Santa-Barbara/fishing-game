import type { Request, Response } from 'express';
import { Comments } from '../db';

export const create = (req: Request, res: Response) => {
  const comment = {
    postId: req.body.postId,
    author: req.body.author,
    body: req.body.body,
    date: req.body.date,
  };

  Comments.create(comment)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      });
    });
};

export const findAll = (req: Request, res: Response) => {
  console.log(req.query)
  const id = req.query.id;

  Comments.findAll({ where: { postId: id } })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      });
    });
};
