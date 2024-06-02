import express from "express";
import {
  getTasksByUser,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.js";
import { verifyToken } from "../libs/middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getTask);
router.get("/user/:id", verifyToken, getTasksByUser);
router.patch("/:id", verifyToken, updateTask);
router.post("/create", verifyToken, createTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
