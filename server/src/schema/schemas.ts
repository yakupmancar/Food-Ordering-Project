import mongoose, { Document, Schema } from "mongoose";

interface foodInterface extends Document {
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl: string;
}

//! FOOD ŞEMASI
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

// "Food" koleksiyonunu temsil eden model.
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

//! CART ŞEMASI
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

// "Cart" koleksiyonunu temsil eden model.
const CartModel = mongoose.model<cartInterface>("Cart", cartSchema);

//*********************************************************************************************************************

interface orderInterface extends Document {
  userId: string;
  items: CartItem[];
  totalPrice: number;
  orderDate: Date;
}

//! ORDER ŞEMASI
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

// "Order" koleksiyonunu temsil eden model.
const OrderModel = mongoose.model<orderInterface>("Order", orderSchema);

export { FoodModel, CartModel, OrderModel };
