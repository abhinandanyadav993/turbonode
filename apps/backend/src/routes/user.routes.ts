// src/routes/payment.routes.ts
import { Router } from "express";
import {
  listUsers,
  createUser,
  getUserById,
  getUsersByName,
  deleteUser,
  updateUser
} from "../controllers/user.controller";
import express from "express";

const userRouter = Router();

userRouter.get("/", listUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.get("/search/:name", getUsersByName);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
