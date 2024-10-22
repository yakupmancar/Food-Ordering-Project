import { Request, Response } from "express";
import { CartModel } from "../schema/schemas";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;

    // Giriş verilerini kontrol et
    console.log("Request Body:", req.body);

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    for (const item of items) {
      const foodIndex = cart.items.findIndex(
        (cartItem) => cartItem.foodId === item.foodId
      );

      if (foodIndex > -1) {
        cart.items[foodIndex].quantity += item.quantity;
      } else {
        cart.items.push({
          foodId: item.foodId,
          foodName: item.foodName,
          foodCategory: item.foodCategory,
          foodPrice: item.foodPrice,
          foodImageUrl: item.foodImageUrl,
          quantity: item.quantity,
        });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};


export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const cart = await CartModel.findOne({ userId });

    console.log("Fetched Cart:", cart); // Cart verisini kontrol etmek için logla

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};
