import { Router } from "express";
import {
  addToWishlist,
  deleteAllWishLists,
  deleteSingleWishList,
  getAllWishlists,
} from "./wishlist.controller";

const router = Router();

router.post("/add", addToWishlist);

router.get("/:id", getAllWishlists);

router.delete("/delete/all/:id", deleteAllWishLists);

router.delete("/delete/:id", deleteSingleWishList);

export const wishlistRoutes = router;
