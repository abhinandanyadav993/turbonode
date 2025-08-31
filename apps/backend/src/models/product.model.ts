import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "@mhs/shared";

export interface IProductModel extends Omit<IProduct, "_id">, Document {}

const ProductSchema: Schema = new Schema<IProductModel>(
  {
      title: { type: String, required: true },
      pictures: [{ type: String }],
      mrp: { type: Number, required: true },
      discountedPrice: { type: Number, required: true },
      stockAvailability: { type: Number, required: true },
      description: { type: String },
      features: [{ type: String }],
      usages: [{ type: String }],
      punchline: { type: String },
      character: { type: String },
      tags: [{ type: String }],
      dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
        unit: { type: String },
      },
      sizes: [{ type: String }],
      colors: [{ type: String }],
      material: { type: String },
      shape: { type: String },
      mov: { type: Number },
      moq: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IProductModel>("Product", ProductSchema);
