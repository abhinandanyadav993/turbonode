// src/routes/payment.routes.ts
import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import express from "express";

const paymentRouter = Router();

paymentRouter.post("/", PaymentController.createPayment);
paymentRouter.get("/", PaymentController.getPayments);
paymentRouter.get("/:id", PaymentController.getPaymentById);
paymentRouter.put("/:id/status", PaymentController.updatePaymentStatus);
paymentRouter.post("/create-checkout-session", PaymentController.createCheckoutSession);
paymentRouter.post("/refund/:id", PaymentController.refundPayment);


// Stripe Webhook (⚠️ raw body required)
paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.stripeWebhook
);


export default paymentRouter;
