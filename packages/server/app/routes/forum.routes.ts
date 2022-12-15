
  const forums = require("../controllers/forum.controller.ts");

  const router = require("express").Router();

  router.post("/", forums.create);
  router.get("/", forums.findAll);
  router.put("/:id", forums.update);

  export default router;
