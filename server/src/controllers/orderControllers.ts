import { Request, Response } from "express";
import { OrderModel } from "../schema/schemas";

// Yeni bir sipariş oluştururuz.
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

    // Sipariş verilerinin doğruluğunu kontrol ederiz.
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Geçeriz sipariş datası." });
    }
    await newOrder.save();  // Yeni siparişi veritabanına kaydederiz.
    res
      .status(201)
      .json({ message: "Sipariş başarıyla kaydedildi.", order: newOrder });
  } catch (error) {
    console.error("Sipariş sırasında bir hata oluştu.", error);
    res.status(500).json({ message: "Sipariş sırasında beklenmeyen bir sunucu hatası oluştu." });
  }
};

// Kullanıcıya ait siparişlerin listelenmesi;
export const myOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ userId });   // Kullanıcıya ait siparişleri buluruz.
    res.status(200).json(orders);
    console.log(orders);
  } catch (error) {
    console.error("Siparişleri getirme sırasında hata:", error);
    res.status(500).json({ message: "Sipariş getirme sırasında beklenmeyen bir sunucu hatası oluştu.", error });
  }
};
