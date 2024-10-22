import express from "express";
import { addToCart, getCart} from "../controllers/cartControllers";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCart)

export default router;
