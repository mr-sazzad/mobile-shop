import { RequestHandler } from "express";
import { wishlistService } from "./wishlist.service";

export const addToWishlist: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await wishlistService.addToWishlist(data);

    res.status(201).json({
      status: 201,
      message: "Mobile Added to Wishlist",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllWishlists: RequestHandler = async (req, res, next) => {
  try {
    // trying to get all wishlists using userId
    const { id } = req.params;
    const result = await wishlistService.getAllWishlists(id);

    res.status(200).json({
      status: 200,
      message: "All wishlists retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleWishList: RequestHandler = async (req, res, next) => {
  try {
    // trying to delete single wishlist using wishlist id
    const { id } = req.params;
    const result = await wishlistService.deleteSingleWishlist(id);

    res.status(200).json({
      status: 200,
      message: "wishlist deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteAllWishLists: RequestHandler = async (req, res, next) => {
  try {
    // trying to delete all wishlists using userId
    const { id } = req.params;
    const result = await wishlistService.deleteAllWishlists(id);

    res.status(200).json({
      status: 200,
      message: "Wishlists deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
