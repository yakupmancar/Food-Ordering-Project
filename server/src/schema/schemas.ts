import mongoose, { Document, Schema } from "mongoose";

//! FOOD INTERFACE
interface foodInterface extends Document {
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl: string;
}

//! FOOD MODEL
const foodSchema = new Schema<foodInterface>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);
const FoodModel = mongoose.model<foodInterface>("Food", foodSchema);

//*********************************************************************************************************************

interface CartItem {
  foodId: string;
  foodName: string;
  foodCategory: string;
  foodPrice: number;
  foodImageUrl: string;
  quantity: number;
}

interface cartInterface extends Document {
  userId: string;
  items: CartItem[];
}

const cartSchema = new Schema<cartInterface>(
  {
    userId: { type: String, required: true },
    items: [
      {
        foodId: { type: String, required: true },
        foodName: { type: String, required: true },
        foodCategory: { type: String, required: true },
        foodPrice: { type: Number, required: true },
        foodImageUrl: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
const CartModel = mongoose.model<cartInterface>("Cart", cartSchema);

//*********************************************************************************************************************

//! ORDER INTERFACES

interface orderInterface extends Document {
  userId: string;
  items: CartItem[];
  totalPrice: number;
  orderDate: Date;
}

const orderSchema = new Schema<orderInterface>(
  {
    userId: { type: String, required: true },
    items: [
      {
        foodId: { type: String, required: true },
        foodName: { type: String, required: true },
        foodCategory: { type: String, required: true },
        foodPrice: { type: Number, required: true },
        foodImageUrl: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<orderInterface>("Order", orderSchema);

export { FoodModel, CartModel, OrderModel };
