import { Request, Response } from "express";
import User from "../models/user.model";
import { IUser } from "@mhs/shared";

export const listUsers = async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).lean();
  res.json(user);
};

export const getUsersByName = async (req: Request, res: Response) => {
  const users = await User.find({
    $or: [
      { firstName: { $regex: req.params.name, $options: "i" } },
      { lastName: { $regex: req.params.name, $options: "i" } },
    ],
  }).lean();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const payload: IUser = req.body;
    const user = await User.create(payload);
    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || "Invalid data" });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted" });
};