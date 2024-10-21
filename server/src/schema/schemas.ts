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
  food: mongoose.Types.ObjectId;
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
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        }, // Food ile ilişki
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model<cartInterface>("Cart", cartSchema);

//*********************************************************************************************************************

//! ORDER INTERFACES
interface OrderItem {
  food: foodInterface;
  quantity: number;
}

interface orderInterface extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Burada ObjectId kullanıyoruz
  items: OrderItem[];
  totalPrice: number;
  orderDate: Date;
}

//! ORDER MODEL
const orderSchema = new Schema<orderInterface>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model<orderInterface>("Order", orderSchema);

export { FoodModel, OrderModel, CartModel };
