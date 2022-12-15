const dbs = require("../models");
const Forum = dbs.forums;
const Op = dbs.Sequelize.Op;

export const create = (req: { body: { title: any; author: any; updateTime: any; body: any; comments: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {

  const forum = {
    title: req.body.title,
    author: req.body.author,
    updateTime: req.body.updateTime,
    body: req.body.body,
    comments: req.body.comments
  };

  Forum.create(forum)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    });
    
};

export const find = (req: { query: { title: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Forum.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    });
};

export const update = (req: { params: { id: any; }; body: any; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const id = req.params.id;

  Forum.update(req.body, {
    where: { id: id }
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Forum was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Forum with id=${id}.`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error updating Forum with id=" + id + err
      });
    });
};
