import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useUser } from "@clerk/clerk-react";
import { FaTimes } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { getCart, cart, deleteItem, setCart, updateQuantity } =
    useAppContext();
  const { user } = useUser();
  const userId = user?.id;

  // Kullanıcı değiştiğinde o kullanıcının sepet içeriğini getirmek için kullanırız;
  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);

  //Toplam ücret hesaplama;
  const calculateTotalPrice = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total: number, item: any) => total + item.foodPrice * item.quantity,
      0
    );
  };
  const totalPrice = calculateTotalPrice();

  //! Sepetten Ürün Silmek;
  const handleDelete = (foodId: string) => {
    if (userId) {
      deleteItem(userId, foodId);
    }
  };

  //! Sipariş Vermek;
  const navigate = useNavigate();

  const placeOrder = async () => {
    const items = cart.items.map((item: any) => ({
      foodId: item.foodId,
      foodName: item.foodName,
      foodCategory: item.foodCategory,
      foodPrice: item.foodPrice,
      foodImageUrl: item.foodImageUrl,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post("http://localhost:5000/api/myOrders", {
        userId,
        items,
        totalPrice,
        orderDate: new Date().toISOString(),
      });

      toast.success("Sipariş başarıyla oluşturuldu!", {
        position: "top-right",
        autoClose: 1500,
      });
      console.log("Verilen sipariş:", response.data);

      // Sipariş verildikten 1.5 saniye sonra sipariş ekranına yönlendirilir.
      setTimeout(() => {
        navigate("/myOrders");
      }, 1500);

      // Tüm ürünleri sepetten sil
      for (const item of cart.items) {
        await deleteItem(userId as string, item.foodId as string);
      }

      // Sepeti tamamen temizle
      setCart({ items: [] });
    } catch (error) {
      console.error("Sipariş verirken hata oluştu:", error);
    }
  };

  //! Miktar Güncelleme;
  // Ürün mitkarını arttırma;
  const handleIncrease = (foodId: string, quantity: number) => {
    updateQuantity(userId as string, foodId, quantity + 1);
  };

  // Ürün miktarını azaltma;
  const handleDecrease = (foodId: string, quantity: number) => {
    updateQuantity(userId as string, foodId, quantity - 1);
    if (quantity > 1) {
      updateQuantity(userId as string, foodId, quantity - 1);
    }
  };

  return (
    <div className="my-20">
      <table className="w-full text-left">
        {cart && cart.items.length > 0 ? (
          <thead className="border-b">
            <tr className="text-sm md:text-base xl:text-lg text-gray-600">
              <th className="pb-2 md:pb-4">Yemek ismi</th>
              <th className="pb-2 md:pb-4">Yemek</th>
              <th className="pb-2 md:pb-4">Tutar</th>
              <th className="pb-2 md:pb-4">Miktar</th>
              <th className="pb-2 md:pb-4">Toplam</th>
              <th className="pb-2 md:pb-4">Kaldır</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        <tbody>
          {cart && cart.items.length > 0 ? (
            cart.items.map((item: any) => (
              <tr
                key={item._id}
                className="border-b text-sm md:text-base xl:text-lg"
              >
                <td className="w-1/5">
                  <img
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-28 xl:h-28 object-cover py-2 md:py-4"
                    src={item.foodImageUrl}
                    alt={item.foodName}
                  />
                </td>
                <td className="w-1/5">{item.foodName}</td>
                <td>{item.foodPrice}₺</td>
                <td className="px-1 w-1/6">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleIncrease(item.foodId, item.quantity)}
                      className="text-xs md:text-sm"
                    >
                      <FiPlus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleDecrease(item.foodId, item.quantity)}
                      className="text-xs md:text-sm"
                    >
                      <FiMinus />
                    </button>
                  </div>
                </td>
                <td className="pl-2 font-semibold w-1/5">
                  {item.foodPrice * item.quantity}₺
                </td>
                <td className="text-base md:text-lg lg:text-xl xl:text-2xl pl-3 w-1/12">
                  <button onClick={() => handleDelete(item.foodId)}>
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center text-2xl font-semibold">
                Sepetiniz Boş.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {cart && cart.items.length > 0 ? (
        <section className="md:flex justify-between gap-40 mt-14">
          <form className="w-full md:w-[40%]">
            <h1 className="text-lg md:text-xl">
              Promosyon kodunuz varsa, buradan kullanabilirsiniz.
            </h1>
            <div className="flex mt-2">
              <input
                type="text"
                className="w-full rounded-s-md outline-none bg-gray-200 pl-2 "
                placeholder="promosyon kodu"
                required
              />
              <button className="text-base md:text-lg rounded-e-md bg-gray-800 text-white px-4 md:px-8 lg:px-10 xl:px-14 py-2">
                Onayla
              </button>
            </div>
          </form>

          <div className="w-full md:w-[60%] text-lg mt-14 md:mt-0">
            <h1 className="font-semibold text-xl lg:text-2xl xl:text-3xl mb-4">
              Sepet Toplamı
            </h1>
            <section className="flex justify-between text-sm md:text-base">
              <h1>Toplam Tutar</h1>
              <h1>{totalPrice}₺</h1>
            </section>

            <div className="border my-2"></div>

            <section className="flex justify-between text-sm md:text-base">
              <h1>Teslimat Ücreti</h1>
              <h1>25₺</h1>
            </section>

            <div className="border my-2"></div>

            <section className="flex justify-between font-bold text-sm md:text-base">
              <h1>Toplam</h1>
              <h1>{totalPrice + 25}₺</h1>
            </section>

            <button
              onClick={placeOrder}
              className="bg-orange-500 text-base md:text-lg xl:text-xl text-gray-100 px-6 md:px-8 lg:px-12 xl:px-16 py-2 md:py-3 font-semibold mt-7 rounded-xl"
            >
              Siparişi ver
            </button>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
