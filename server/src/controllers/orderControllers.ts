import { Request, Response } from "express";
import { OrderModel } from "../schema/schemas";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, totalPrice, orderDate } = req.body;

    console.log("Gelen Sipariş:", items);
    const newOrder = new OrderModel({
      userId,
      items,
      totalPrice,
      orderDate,
    });

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Invalid order data." });
    }
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully.", order: newOrder });
  } catch (error) {
    console.error("An error occurred while ordering", error);
    res.status(500).json({ message: "An error occurred while ordering" });
  }
};

export const myOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.findOne({ userId });

    res.status(200).json(orders);
    console.log(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
