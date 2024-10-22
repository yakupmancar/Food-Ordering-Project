import axios from "axios";
import { createContext, useContext, useState } from "react";

interface AppContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  addToCart: (
    userId: string,
    foodId: string,
    foodName: string,
    foodCategory: string,
    foodPrice: number,
    foodImageUrl: string,
    quantity: number
  ) => void;
  getCart: (userId: string) => void;
  cart: any;
}

//Build a context
const AppContext = createContext<AppContextType | undefined>(undefined);

//Build a provider for context
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  //! CATEGORY
  const updateCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  //**********************************************************************************************************

  //! CART
  const [cart, setCart] = useState<any>(null);

  const addToCart = async (
    userId: string,
    foodId: string,
    foodName: string,
    foodCategory: string,
    foodPrice: number,
    foodImageUrl: string,
    quantity: number
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart", {
        userId,
        items: [
          {
            foodId,
            foodName,
            foodCategory,
            foodPrice,
            foodImageUrl,
            quantity,
          },
        ],
      });
      console.log("Cart updated:", response.data);

      await getCart(userId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getCart = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/cart/${userId}`
      );
      console.log("Api response", response.data);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory: updateCategory,
        addToCart,
        getCart,
        cart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useFoodContext must be used within a FoodProvider");
  return context;
};
