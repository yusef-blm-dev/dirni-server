import { db } from "../libs/dbConnect.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const collection = await db.collection("users");

export const getSingleUser = async (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const user = await collection.findOne(query);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next({
      status: 401,
      message: "You can only update your own account!",
    });
  }
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const query = { _id: new ObjectId(req.params.id) };
    const data = {
      $set: {
        ...req.body,
        updatedAt: new Date().toISOString(),
      },
    };

    const options = {
      returnDocument: "after",
    };
    const updatedUser = await collection.findOneAndUpdate(query, data, options);
    const { password: pass, updateddAt, createdAt, ...rest } = updateUser;
    res.status(200).json(updatedUser);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next({
      status: 401,
      message: "You can only delete your own account!",
    });
  }
  try {
    const query = { _id: new ObjectId(req.params.id) };
    await collection.deleteOne(query);
    res.status(200).json({ message: "User has been deleted successfully" });
  } catch (error) {
    next({ status: 500, error });
  }
};
