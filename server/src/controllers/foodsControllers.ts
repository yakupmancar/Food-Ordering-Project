import { Request, Response } from "express";
import { FoodModel } from "../schema/schemas";

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find();
    res.status(200).json(foods);
  } catch (error) {
    console.log("Error in fetching foods");
    res.status(500).send(error);
  }
};

export const addFood = async (req: Request, res: Response) => {
  const { name, category, price, description, imageUrl } = req.body;

  try {
    const newFood = new FoodModel({
      name,
      category,
      price,
      description,
      imageUrl,
    });

    const saveFood = await newFood.save();
    res.status(201).json(saveFood);
  } catch (error) {
    res.status(500).json({message: "An error occurred while adding food.", error})
  }
};
