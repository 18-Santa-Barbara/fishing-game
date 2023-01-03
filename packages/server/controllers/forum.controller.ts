// import fetch from 'node-fetch';
import type { Request, Response } from 'express';
import { Forum } from '../db';
import axios from 'axios';

type Forum = {
  title: string;
  updateTime: string;
  body: string;
  author?: string;
};

export const create = (req: Request, res: Response) => {
  const forum: Forum = {
    title: req.body.title,
    updateTime: req.body.updateTime,
    body: req.body.body,
  };

  const stringCookie = Object.keys(req.cookies)
    .map(key => `${key}=${req.cookies[key]}`)
    .join('; ');

  axios
    .get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: { Cookie: stringCookie },
    })
    .then(({ data }) => {
      forum.author = data.login;
      Forum.create(forum)
        .then((data: any) => {
          res.send(data);
        })
        .catch((err: { message: any }) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating a new post.',
          });
        });
    })
    .catch(err => {
      res.status(err?.response?.status || 500).send({
        message:
          err?.response?.data?.reason ||
          'Some error occurred while creating a new post.',
      });
      return;
    });
};

export const findAll = (_: Request, res: Response) => {
  Forum.findAll()
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting all posts.',
      });
    });
};

export const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Forum.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find with id=${id}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving with id=' + id + err,
      });
    });
};
