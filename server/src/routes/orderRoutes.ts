import express from "express";
import { myOrders, placeOrder } from "../controllers/orderControllers";

const router = express.Router();

router.post("/", placeOrder);
router.get("/:userId", myOrders);

export default router;
