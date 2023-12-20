import { Router } from "express";
import { userRouter } from "../app/users/user.router";
import { mobileRoutes } from "../app/mobile/mobile.router";
import { cartRouter } from "../app/cart/cart.router";
import { reviewRoutes } from "../app/review/review.router";
import { wishlistRoutes } from "../app/wishlists/wishlist.router";

const router = Router();

router.use("/users", userRouter);

router.use("/mobiles", mobileRoutes);

router.use("/cart", cartRouter);

router.use("/review", reviewRoutes);

router.use("/wishlist", wishlistRoutes);

export const globalRoutes = router;
