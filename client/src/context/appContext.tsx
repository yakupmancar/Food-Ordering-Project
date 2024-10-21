import axios from "axios";
import { createContext, useContext, useState } from "react";

interface AppContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  addToCart: (userId: string, foodId: string, quantity: number) => void;
}

//Build a context
const AppContext = createContext<AppContextType | undefined>(undefined);

//Build a provider for context
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // category stuff
  const updateCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  //cart stuff
  const addToCart = async (
    userId: string,
    foodId: string,
    quantity: number
  ) => {
    try {
      const response = await axios.post("http://localhost:5001/api/cart", {
        userId,
        items: [{ food: foodId, quantity }],
      });
      console.log("Cart updated:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory: updateCategory,
        addToCart,
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
