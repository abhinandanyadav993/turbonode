import { Schema, model, Document } from "mongoose";
import { IOrder } from "@mhs/shared";


export interface IOrderModel extends Omit<IOrder, "_id">, Document {}

const OrderSchema = new Schema<IOrderModel>({
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, enum: ["PENDING","PAID","PAYMENT_FAILED","CANCELLED","SHIPPED","DELIVERED","REFUNDED"], default: "PENDING" },
    orderValue: { type: Number, required: true },
    isReturned: { type: Boolean, default: false },
    shippingVendor: { type: Schema.Types.ObjectId, ref: "Shipping", required: false },
    shippingId: { type: String, required: false },
    shippedDate: { type: Date, required: false},
    deliveredDate: { type: Date, required: false },
    cancelledDate: { type: Date, required: false },
  },
  { timestamps: true }
);

export default model<IOrderModel>("Order", OrderSchema);
