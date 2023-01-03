import type { Request, Response } from 'express';
import { Like } from '../db';

export const create = (req: Request, res: Response) => {
  const like = {
    commentId: req.body.commentId,
    author: req.body.author,
  };

  Like.create(like)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating.",
      });
    });
};

export const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Like.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find with id=${id}.`,
        });
      }
    })
    .catch((err: string) => {
      res.status(500).send({
        message: "Error retrieving with id=" + id + err,
      });
    });
};

export const findAll = (req: Request, res: Response) => {
  const { commentId } = req.params;

  Like.findAll({ where: { commentId } })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
};

export const deleteLike = (req: Request, res: Response) => {
  const author = req.body.author;
  const id = req.body.commentId;

  Like.destroy({
    where: { author: author, commentId: id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete with id=${id}.`,
        });
      }
    })
    .catch((err: string) => {
      res.status(500).send({
        message: "Can't delete like with id=" + id + err,
      });
    });
};
