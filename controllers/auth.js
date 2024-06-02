import bcrypt from "bcrypt";
import { db } from "../libs/dbConnect.js";
import jwt from "jsonwebtoken";

const collection = await db.collection("users");

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const query = {
      $or: [{ username }, { email }],
    };
    const existingUser = await collection.findOne(query);
    if (existingUser) {
      return next({
        status: 422,
        message: "Username or Email  already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      email,
      password: hashedPassword,
      avatar: "https://g.codewithnathan.com/default-user.png",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const { insertedId } = await collection.insertOne(user);
    const token = jwt.sign({ id: insertedId }, process.env.AUTH_SECRET);
    user._id = insertedId;
    const { password: pass, updatedAt, createdAt, ...rest } = user;
    res
      .cookie("dirni_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        partitioned: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next({
      status: 500,

      error,
    });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email });
    if (!user) {
      return next({ status: 404, message: "User Not Found!!" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next({ status: 401, message: "Invalid Password!!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET);
    user._id = user._id;
    const { password: pass, updateddAt, createdAt, ...rest } = user;
    res
      .cookie("dirni_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        partitioned: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("dirni_token");
    res.status(200).json({ message: "Signout Successfull!!" });
  } catch (error) {
    next({ status: 500, error });
  }
};
