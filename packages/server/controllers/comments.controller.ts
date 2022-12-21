import axios from 'axios';
import type { Request, Response } from 'express';
import { Comments } from '../db';

type Comment = {
  postId: string;
  body: string;
  date: string;
  author?: string;
  comment: string;
};

export const create = (req: Request, res: Response) => {
  const {postId, author, body, date, comment} = req.body;

  const stringCookie = Object.keys(req.cookies)
    .map(key => `${key}=${req.cookies[key]}`)
    .join('; ');

  axios
    .get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: { Cookie: stringCookie },
    })
    .then(({ data }) => {
      comment.author = data.login;
      Comments.create({ postId, author, body, date, comment })
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
