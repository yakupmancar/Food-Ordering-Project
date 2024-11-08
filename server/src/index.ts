import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import foodRoutes from "./routes/foodRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors"
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/myOrders", orderRoutes);

const port = 5000;
app.listen(port, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
