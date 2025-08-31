import { Schema, model, Document } from "mongoose";
import { IUser } from "@mhs/shared";

export interface IUserModel extends Omit<IUser, "_id">, Document {}

const UserSchema = new Schema<IUserModel>({
 firstName: { type: String, required: true },
 lastName: { type: String, required: true },
 companyName: { type: String },
 phoneNumber: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 shippingAddresses: [{ type: String }]
 }, { timestamps: true });

export default model<IUserModel>("User", UserSchema);
