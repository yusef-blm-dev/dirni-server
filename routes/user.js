import express from "express";
import { getSingleUser, updateUser, deleteUser } from "../controllers/user.js";
import { verifyToken } from "../libs/middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getSingleUser);
router.patch("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
