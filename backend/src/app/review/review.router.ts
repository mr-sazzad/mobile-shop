import { Router } from "express";
import auth from "../middleware/auth";
import { userRole } from "../types";
import { createAReview, getAllReviews } from "./review.controller";

const router = Router();

router.post("/create", auth(userRole.user), createAReview);

router.get("/mobile/:id", getAllReviews);

export const reviewRoutes = router;
