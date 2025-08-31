import { Schema, model, Document } from "mongoose";
import { IPayment } from "@mhs/shared";


export interface IPaymentModel extends Omit<IPayment, "_id">, Document {}

const PaymentSchema = new Schema<IPaymentModel>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  method: {
  type: String,
      enum: ["CREDIT_CARD" , "DEBIT_CARD" , "UPI" , "NET_BANKING" , "CASH_ON_DELIVERY"],

  required: true
  },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED", "CONFIRMED"],
    default: "PENDING",
  },
  transactionId: String,
  paymentDate: { type: Date, default: Date.now },
   stripeSessionId: { type: String },
    stripePaymentIntent: { type: String },
});
export default model<IPaymentModel>("Payment", PaymentSchema);
