import type { Request, Response } from 'express';
import { Forum } from '../db';

export const create = async (req: Request, res: Response) => {
  const forum = {
    title: req.body.title,
    author: req.body.author,
    updateTime: req.body.updateTime,
    body: req.body.body,
  };
  
  //TODO: Реализация проверки пользователя, отправка запроса с текущей кукой


  Forum.create(forum)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating a new post.',
      });
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
          message: `Cannot find with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving with id=" + id + err
      });
    });
};
