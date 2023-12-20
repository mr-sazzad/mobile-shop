import { Router } from "express";
import {
  addToCart,
  deleteSingleCart,
  getAllFromCart,
  getSingleFromCart,
  removeAllFromCart,
  updateSingleCart,
} from "./cart.controller";

const router = Router();

router.post("/add", addToCart);

router.get("/", getAllFromCart);

router.patch("/:id", updateSingleCart);

router.delete("/all/:id", removeAllFromCart);

router.delete("/:id", deleteSingleCart);

router.get("/:id", getSingleFromCart);

export const cartRouter = router;
