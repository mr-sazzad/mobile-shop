import { Router } from "express";
import {
  banUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  signupUser,
  updateSingleUser,
} from "./user.controller";

const router = Router();

router.post("/sign-up", signupUser);

router.post("/login", loginUser);

router.get("/", getAllUsers);

router.patch("/ban/:id", banUser);

router.get("/:id", getSingleUser);

router.patch("/:id", updateSingleUser);

export const userRouter = router;
