import { Request, Response } from "express";
import Order from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  const orders = await Order.find().populate("customerId").populate("products.productId");
  res.json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate("customerId").populate("products.productId");
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

export const updateOrder = async (req: Request, res: Response) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("customerId")
    .populate("products.productId");
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json({ message: "Order deleted" });
};
