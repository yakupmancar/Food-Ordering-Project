import { Request, Response } from "express";
import { FoodModel } from "../schema/schemas";

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find(); // Veritabanından tüm food'lar alınır.
    res.status(200).json(foods);
  } catch (error) {
    console.log("Beklenmeyen bir sunucu hatası oluştu.");
    res.status(500).send(error);
  }
};

export const addFood = async (req: Request, res: Response) => {
  const { name, category, price, description, imageUrl } = req.body;

  try {
    const newFood = new FoodModel({
      // Yeni bir yemek document'i oluşturulur.
      name,
      category,
      price,
      description,
      imageUrl,
    });

    const saveFood = await newFood.save(); // Document veritabanına kaydedilir.
    res.status(201).json(saveFood);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Beklenmeyen bir sunucu hatası oluştu.", error });
  }
};
