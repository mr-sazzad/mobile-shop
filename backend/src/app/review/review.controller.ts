import { RequestHandler } from "express";
import { reviewsServices } from "./review.service";

export const createAReview: RequestHandler = async (req, res, next) => {
  const review = req.body;

  try {
    const result = await reviewsServices.addReview(review);

    res.status(201).json({
      status: 201,
      message: "Review has been Created",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllReviews: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await reviewsServices.getAllReviews(productId);

    res.status(200).json({
      status: 200,
      message: "All reviews retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
