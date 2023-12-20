import { Router } from "express";
import { userRouter } from "../app/users/user.router";
import { mobileRoutes } from "../app/mobile/mobile.router";
import { cartRouter } from "../app/cart/cart.router";
import { reviewRoutes } from "../app/review/review.router";

const router = Router();

router.use("/users", userRouter);

router.use("/mobiles", mobileRoutes);

router.use("/cart", cartRouter);

router.use("/review", reviewRoutes);

export const globalRoutes = router;
