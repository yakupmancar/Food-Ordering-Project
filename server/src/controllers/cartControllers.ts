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

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, foodId } = req.params;

    // Sepetteki öğeyi bul ve sil
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const itemIndex = cart.items.findIndex((item) => item.foodId === foodId);

    if (itemIndex === -1) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json(cart);
  } catch (error: any) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
