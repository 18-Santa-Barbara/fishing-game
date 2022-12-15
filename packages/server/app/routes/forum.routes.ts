module.exports = (app: { use: (arg0: string, arg1: any) => void; }) => {
  const forums = require("../controllers/forum.controller.ts");

  const router = require("express").Router();

  router.post("/", forums.create);
  router.get("/", forums.findAll);
  router.put("/:id", forums.update);

  app.use("/api/forums", router);
};
