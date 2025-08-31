import mongoose, { Schema, Document } from "mongoose";
import { IUserReview } from "@mhs/shared";

export interface IReviewModel extends Omit<IUserReview, "_id">, Document {}


const ReviewSchema: Schema = new Schema<IReviewModel>({
  parentId: { type: Schema.Types.ObjectId, ref: "Review" },
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: { type: String },
  ratings: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<IReviewModel>("Review", ReviewSchema);
