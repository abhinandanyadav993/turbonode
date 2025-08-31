import mongoose from 'mongoose';
import {IUser} from './user';
import {IProduct} from './product';
import { IShipping } from "./shipping";


export type OrderStatus =
   | "PENDING"
    | "PAID"
    | "PAYMENT_FAILED"
    | "CANCELLED"
    | "SHIPPED"
    | "DELIVERED"
    | "REFUNDED";

export interface IOrder {
  _id?: string;
  customerId: mongoose.Types.ObjectId | IUser;
    products: {
    productId: mongoose.Types.ObjectId | IProduct;
     quantity: number
     }[];
    orderDate: Date;
    orderStatus: OrderStatus;
    orderValue: number;
    isReturned?: boolean;
    shippingVendor?: mongoose.Types.ObjectId | IShipping;
    shippingId?: string;
    shippedDate?: Date;
    deliveredDate?: Date;
    cancelledDate?: Date;
}
