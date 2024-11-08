import { Request, Response } from "express";
import { CartModel } from "../schema/schemas";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;

    // Gönderilen veriyi kontrol için loglama.
    console.log("Request Body:", req.body);

    // Kullanıcının sepetini bul, sepet yoksa yeni sepet oluştur.
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    // Gönderilen ürünleri sepete ekleme;
    for (const item of items) {
      const foodIndex = cart.items.findIndex(
        (cartItem) => cartItem.foodId === item.foodId
      );

      if (foodIndex > -1) {
        cart.items[foodIndex].quantity += item.quantity; // Eğer ürün varsa miktarını arttırır.
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

    // Değişiklikleri veritabanına kaydeder ve sepete eklenen ürünleri döner
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Sepete ürün ekleme sırasında hata:", error);
    res
      .status(500)
      .json({
        message:
          "Sepete ürün ekleme sırasında beklenmeyen bir sunucu hatası oluştu.",
        error,
      });
  }
};

// Kullanıcının sepetindeki ürünleri getirir;
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Kullanıcının sepetini bulunur, sepet yoksa hata döndürür;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      res.status(404).json({ message: "Sepet bulunamadı." });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    console.error("Ürünleri getirme sırasında hata:", error);
    res
      .status(500)
      .json({
        message:
          "Sepetteki ürünleri getirme sırasında beklenmeyen bir sunucu hatası oluştu.",
        error,
      });
  }
};

// Sepetten belirli bir ürünü kaldırmak;
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, foodId } = req.params;

    // Kullanıcının sepetini bulunur, sepet yoksa hata döndürür;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      res.status(404).json({ message: "Sepet bulunamadı." });
      return;
    }

    // Belirli ürün sepetten kaldırılır. Ürün bulunmazsa hata döndürür;
    const itemIndex = cart.items.findIndex((item) => item.foodId === foodId);

    if (itemIndex === -1) {
      res.status(404).json({ message: "Ürün bulunamadı" });
      return;
    }
    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json(cart);
  } catch (error: any) {
    console.error("Ürün silme işleminde hata:", error);
    res
      .status(500)
      .json({
        message:
          "Sepetten ürün silme sırasında beklenmeyen bir sunucu hatası oluştu:",
        error: error.message,
      });
  }
};

// Sepetteki ürünün miktarını güncelleme;
export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, foodId } = req.params;
    const { quantity } = req.body;

    // Kullanıcının sepetini bulunur, sepet yoksa hata döndürür;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      res.status(404).json({ message: "Sepet bulunamadı." });
      return;
    }

    //sepetteki doğru ürünü bul;
    const item = cart.items.find((item) => item.foodId === foodId);
    if (!item) {
      res.status(400).json({ message: "Sepette ilgili ürün bulunamadı." });
      return;
    }

    item.quantity = quantity;

    // Miktar 0 ise ürünü sepetten kaldırır
    if (item.quantity === 0) {
      cart.items = cart.items.filter((item) => item.foodId !== foodId);
    }

    //Değişiklikleri veritabanına kaydederiz.
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Sepetteki ürünü güncelleme sırasında hata:", error);
    res
      .status(500)
      .json({ message: "Sepetteki ürünü güncelleme sırasında beklenmeyen bir sunucu hatası oluştu.", error });
  }
};
