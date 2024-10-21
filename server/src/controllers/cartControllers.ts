import { Request, Response } from "express";
import { CartModel } from "../schema/schemas";
import mongoose from "mongoose";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;

    // Giriş verilerini kontrol et
    console.log("Request Body:", req.body);

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    items.forEach((item: any) => {
      const objectIdFoodId = new mongoose.Types.ObjectId(item.food); // turned foodId to ObjectId
      
      // Her item'in içeriğini kontrol et
      console.log("Processing item:", item);

      const foodIndex = cart.items.findIndex(
        (cartItem) => cartItem.food.toString() === objectIdFoodId.toString()
      );

      if (foodIndex > -1) {
        cart.items[foodIndex].quantity += item.quantity;
      } else {
        cart.items.push({ food: objectIdFoodId, quantity: item.quantity });
      }
    });

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};
