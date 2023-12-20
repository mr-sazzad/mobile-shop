import { Router } from "express";
import {
  addMobile,
  deleteMobile,
  getAllMobiles,
  getAllRecentMobiles,
  updateMobile,
} from "./mobile.controller";

const router = Router();

router.post("/add", addMobile);

router.get("/recent", getAllRecentMobiles);

router.get("/", getAllMobiles);

router.patch("/:id", updateMobile);

router.delete("/:id", deleteMobile);

export const mobileRoutes = router;
