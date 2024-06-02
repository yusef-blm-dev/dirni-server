import { db } from "../libs/dbConnect.js";
import { ObjectId } from "mongodb";

const collection = await db.collection("tasks");

export const getTasksByUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const query = { owner: new ObjectId(req.params.id) };
    const { status, orderBy, orderDirection } = req.query;
    if (status) {
      query.status = status;
    }
    const sort = orderBy
      ? {
          [orderBy]: orderDirection === "asc" ? 1 : -1,
        }
      : {};
    const tasks = await collection
      .find(query)
      .sort(sort)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .toArray();
    const taskCount = await collection.count(query);
    res.status(200).json({ tasks, taskCount });
  } catch (error) {
    next({ status: 500, error });
  }
};

export const getTask = async (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const task = await collection.findOne(query);
    if (!task) {
      return next({ status: 404, message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const data = {
      $set: {
        ...req.body,
        owner: new ObjectId(req.body.owner),
        updatedAt: new Date().toISOString(),
      },
    };
    const options = { returnDocument: "after" };
    const result = await collection.findOneAndUpdate(query, data, options);
    res
      .status(200)
      .json({ message: "task updated successfully", data: result });
  } catch (error) {
    next({ status: 500, error });
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = req.body;
    task.owner = new ObjectId(req.user.id);
    task.createdAt = new Date().toISOString();
    task.updatedAt = new Date().toISOString();
    const result = await collection.insertOne(task);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const deleteTask = (req, res, next) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = collection.deleteOne(query);
    res.status(200).json({ result });
  } catch (error) {
    next({ status: 500, error });
  }
};
