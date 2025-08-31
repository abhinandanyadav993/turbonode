import mongoose from "mongoose";
import { IOrder } from "./order";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CONFIRMED";
export type PaymentMethod = "CREDIT_CARD" | "DEBIT_CARD" | "UPI" | "NET_BANKING" | "CASH_ON_DELIVERY";

export interface IPayment {
  _id?: string;
  orderId: mongoose.Types.ObjectId | IOrder;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  currency: string;
  transactionId?: string;
  paymentDate: Date;
   stripeSessionId?: string;
    stripePaymentIntent?: string;
}
