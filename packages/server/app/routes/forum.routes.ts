import * as forums from "../controllers/forum.controller"
import express from "express";

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post("/", forums.create);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get("/", forums.find);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.put("/:id", forums.update);

export default router;
