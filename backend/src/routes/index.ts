import { Router } from "express";
import { userRouter } from "../app/users/user.router";
import { mobileRoutes } from "../app/mobile/mobile.router";
import { cartRouter } from "../app/cart/cart.router";

const router = Router();

router.use("/users", userRouter);

router.use("/mobiles", mobileRoutes);

router.use("/cart", cartRouter);

export const globalRoutes = router;
