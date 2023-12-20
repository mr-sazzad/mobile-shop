import { Router } from "express";
import { userRouter } from "../app/users/user.router";
import { mobileRoutes } from "../app/mobile/mobile.router";

const router = Router();

router.use("/users", userRouter);

router.use("/mobiles", mobileRoutes);

export const globalRoutes = router;
