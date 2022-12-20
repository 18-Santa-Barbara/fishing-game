import axios from 'axios';
import type { Request, Response } from 'express';
import { Comments } from '../db';

type Comment = {
  postId: string;
  body: string;
  date: string;
  author?: string;
};

export const create = (req: Request, res: Response) => {
  const comment: Comment = {
    postId: req.body.postId,
    body: req.body.body,
    date: req.body.date,
  };

  const stringCookie = Object.keys(req.cookies)
    .map(key => `${key}=${req.cookies[key]}`)
    .join('; ');

  axios
    .get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: { Cookie: stringCookie },
    })
    .then(({ data }) => {
      comment.author = data.login;
      Comments.create(comment)
        .then((data: any) => {
          res.send(data);
        })
        .catch((err: { message: any }) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating a comment.',
          });
        });
    })
    .catch(err => {
      res.status(err?.response?.status || 500).send({
        message:
          err?.response?.data?.reason ||
          'Some error occurred while creating a new comment!',
      });
      return;
    });
};

export const findAll = (req: Request, res: Response) => {
  console.log(req.query);
  const id = req.query.id;

  Comments.findAll({ where: { postId: id } })
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
