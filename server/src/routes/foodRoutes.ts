import express from "express";
import { addFood, getAllFoods } from "../controllers/foodsControllers";

const router = express.Router();

router.get("/", getAllFoods);
router.post("/", addFood);

export default router;
