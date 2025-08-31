import { Request, Response } from "express";
import ShippingModel  from "../models/shipping.model";
import { IShipping } from "@mhs/shared";

export const createShipping = async (req: Request, res: Response) => {
  try {
    const shipping: IShipping = req.body;
    const newShipping = new ShippingModel(shipping);
    await newShipping.save();
    res.status(201).json(newShipping);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const getShippings = async (_req: Request, res: Response) => {
  try {
    const shippings = await ShippingModel.find();
    res.json(shippings);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const getShippingById = async (req: Request, res: Response) => {
  try {
    const shipping = await ShippingModel.findById(req.params.id);
    if (!shipping) return res.status(404).json({ message: "Shipping not found" });
    res.json(shipping);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const updateShipping = async (req: Request, res: Response) => {
  try {
    const updatedShipping = await ShippingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShipping) return res.status(404).json({ message: "Shipping not found" });
    res.json(updatedShipping);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const deleteShipping = async (req: Request, res: Response) => {
  try {
    const deletedShipping = await ShippingModel.findByIdAndDelete(req.params.id);
    if (!deletedShipping) return res.status(404).json({ message: "Shipping not found" });
    res.json({ message: "Shipping deleted successfully" });
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};
