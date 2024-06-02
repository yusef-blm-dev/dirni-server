import express from "express";
import { addImage } from "../controllers/cloudinary.js";
import { verifyToken } from "../libs/middleware.js";

const router = express.Router();
router.post("/upload", verifyToken, addImage);
export default router;
