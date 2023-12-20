import { Review } from "@prisma/client";
import ApiError from "../errors/apiError";
import prisma from "../libs/prisma";

const addReview = async (data: Review): Promise<Review | null> => {
  const userId = data.userId;
  const isUserExist = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(403, "Unauthorized For Review");
  }

  if (isUserExist.role !== "user") {
    throw new ApiError(403, "only user is allowed to add a review");
  }

  const result = await prisma.review.create({
    data,
  });

  return result;
};

const getAllReviews = async (productId: string): Promise<Review[]> => {
  const result = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      product: true,
      author: true,
    },
  });

  return result;
};

export const reviewsServices = {
  addReview,
  getAllReviews,
};
