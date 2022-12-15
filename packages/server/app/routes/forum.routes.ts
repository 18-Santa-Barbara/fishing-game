
  import * as forums from "../controllers/forum.controller"
  
  const router = require("express").Router();

  router.post("/", forums.create);
  router.get("/", forums.find);
  router.put("/:id", forums.update);

  export default router;
