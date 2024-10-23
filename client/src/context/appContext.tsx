import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  deleteItem: (userId: string, foodId: string) => void;
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

      toast.success("Ürün sepete eklendi!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getCart = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );
      console.log("Api response", response.data);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
    }
  };

  const deleteItem = async (userId: string, foodId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${foodId}`);
      setCart((prevCart: any) => ({
        ...prevCart,
        items:
          prevCart?.items.filter((item: any) => item.foodId !== foodId) || [],
      }));
      console.log("Succesfull deleting item");
      toast.success("Ürün sepetten kaldırıldı.", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
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
        deleteItem,
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

<ToastContainer />;
