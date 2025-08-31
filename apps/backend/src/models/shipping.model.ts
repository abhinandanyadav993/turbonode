import mongoose, { Schema, Document } from "mongoose";
import { IShipping } from "@mhs/shared";

export interface IShippingModel extends Omit<IShipping, "_id">, Document {}


const ShippingSchema = new Schema<IShippingModel>({
  vendorName: { type: String, required: true },
  vendorUrl: { type: String, required: true },
  vendorTrackingUrl: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
});
export default mongoose.model<IShippingModel>("Shipping", ShippingSchema);
