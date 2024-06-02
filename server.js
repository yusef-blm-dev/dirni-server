import express from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import { errorHandler } from "./libs/middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import cldRouter from "./routes/cloudinary.js";
import taskRouter from "./routes/task.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(fileUpload());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/image", cldRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "you're welcome to dirni API" });
});

//the card wild route
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
