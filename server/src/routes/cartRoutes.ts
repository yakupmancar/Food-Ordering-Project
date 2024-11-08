import express from "express";
import { addToCart, deleteItem, getCart, updateItem } from "../controllers/cartControllers";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCart);
router.delete("/:userId/:foodId", deleteItem);
router.put("/:userId/:foodId", updateItem);

export default router;
