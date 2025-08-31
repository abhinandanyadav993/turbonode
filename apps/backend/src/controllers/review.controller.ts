import { Request, Response } from "express";
import ReviewModel from "../models/review.model";
import { IUserReview } from "@mhs/shared";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review: IUserReview = req.body;
    const newReview = new ReviewModel(review);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const getReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await ReviewModel.find();
    res.json(reviews);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: "Review not found" });
    res.json(updatedReview);
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (error: unknown) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};
