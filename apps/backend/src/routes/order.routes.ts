import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/order.controller";
import express from "express";

const orderRouter = Router();
orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
