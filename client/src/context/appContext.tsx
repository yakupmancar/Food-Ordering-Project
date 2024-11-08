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
  setCart: (items: any) => void;
  deleteItem: (userId: string, foodId: string) => void;
  updateQuantity: (userId: string, foodId: string, quantity: number) => void;
}

//context create ederiz;
const AppContext = createContext<AppContextType | undefined>(undefined);

//context için bir provider oluştururuz;
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); //Kullanıcı tarafından seçilen kategori bilgisini tutar.

  //! CATEGORY
  //Kategori bilgisini güncelleriz;
  const updateCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  //**********************************************************************************************************

  //! CART
  const [cart, setCart] = useState<any>(null); // Sepetteki tüm ürünlerin bilgisini tutmak ve güncellemek için oluştururuz.

  //Sepete ürün ekleme fonksiyonu;
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
      console.log("Ürün sepete başarıyla eklendi:", response.data);
      await getCart(userId);
    } catch (error) {
      console.error("Sepete ürün ekleme sırasında hata:", error);
    }
  };

  //Kullanıcıya ait sepet içeriğini getiririz;
  const getCart = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );
      console.log("Sepet içeriği:", response.data);
      setCart(response.data); // Sepet içeriğini güncelleriz.
    } catch (error) {
      console.error("Sepet içeriğini getirme sırasında hata:", error);
      setCart(null);
    }
  };

  //! DELETE ITEM;
  //Sepetten ürün silmek için oluştururuz;
  const deleteItem = async (userId: string, foodId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${foodId}`);
      setCart((prevCart: any) => ({
        ...prevCart,
        items:
          prevCart?.items.filter((item: any) => item.foodId !== foodId) || [],
      }));
      console.log("Ürün sepetten başarıyla kaldırıldı.");
    } catch (error) {
      console.error("Sepetten ürün kaldırma sırasında hata:", error);
    }
  };

  //! UPDATE QUANTITY
  // Sepetteki belirli bir ürünün miktarını güncellemek için oluştururuz;
  const updateQuantity = async (
    userId: string,
    foodId: string,
    quantity: number
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/${userId}/${foodId}`,
        { quantity }
      );
      console.log("Miktar başarıyla güncellendi: ", response.data);
      await getCart(userId);
    } catch (error) {
      console.error("Ürün miktarı güncelleme sırasında hata:", error);
    }
  };

  //**********************************************************************************************************

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory: updateCategory,
        addToCart,
        getCart,
        cart,
        setCart,
        deleteItem,
        updateQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//context içeriğine erişmek için oluştururuz;
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext AppProvider ile kullanılmalıdır.");
  return context;
};
