import express from "express";
import { addToCart, deleteItem, getCart } from "../controllers/cartControllers";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCart);
router.delete("/:userId/:foodId", deleteItem);
export default router;
