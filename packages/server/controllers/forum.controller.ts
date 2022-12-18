import type { Request, Response } from 'express';
import { Forum } from '../db';

export const create = (
  req: Request,
  res: Response
) => {
  const forum = {
    title: req.body.title,
    author: req.body.author,
    updateTime: req.body.updateTime,
    body: req.body.body
  };

  Forum.create(forum)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      });
    });
};

export const findAll = (
  req: Request,
  res: Response
) => {
  console.log(req.query.title)

  Forum.findAll()
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      });
    });
};