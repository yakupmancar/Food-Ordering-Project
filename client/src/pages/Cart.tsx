import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useUser } from "@clerk/clerk-react";
import { FaTimes } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { getCart, cart, deleteItem } = useAppContext();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);

  const calculateTotalPrice = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total: number, item: any) => total + item.foodPrice * item.quantity,
      0
    );
  };
  const totalPrice = calculateTotalPrice();

  //! Delete product from cart
  const handleDelete = (foodId: string) => {
    if (userId) {
      deleteItem(userId, foodId);
    }
  };

  //! PLACE ORDER
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

    console.log("Sipariş edilen ürünler:", items);

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

      setTimeout(() => {
        navigate("/myOrders");
      }, 1500);

      console.log(response.data);
    } catch (error) {
      console.error("Sipariş verirken hata oluştu:", error);
    }
  };

  return (
    <div className="my-20">
      <table className="w-full text-left">
        {cart && cart.items.length > 0 ? (
          <thead className="border-b">
            <tr className="text-lg text-gray-600">
              <th className="pb-4">Yemek</th>
              <th className="pb-4">Yemeğin ismi</th>
              <th className="pb-4">Tutar</th>
              <th className="pb-4">Miktar</th>
              <th className="pb-4">Toplam</th>
              <th className="pb-4">Kaldır</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        <tbody>
          {cart ? (
            cart.items.map((item: any) => (
              <tr key={item._id} className="border-b text-lg">
                <td>
                  <img
                    className="w-28 object-cover py-4"
                    src={item.foodImageUrl}
                    alt={item.foodName}
                  />
                </td>
                <td>{item.foodName}</td>
                <td>{item.foodPrice}₺</td>
                <td className="px-1">
                  <div className="flex items-center gap-1">
                    <button className="text-sm">
                      <FiPlus />
                    </button>
                    <span>{item.quantity}</span>
                    <button className="text-sm">
                      <FiMinus />
                    </button>
                  </div>
                </td>
                <td className="pl-2">{item.foodPrice * item.quantity}₺</td>
                <td className="text-2xl pl-3">
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
        <section className="flex justify-between gap-40 mt-14">
          <div className="w-1/2 text-lg">
            <h1 className="font-semibold text-3xl mb-4">Sepet Toplamı</h1>
            <section className="flex justify-between">
              <h1>Toplam Tutar</h1>
              <h1>{totalPrice}₺</h1>
            </section>

            <div className="border my-2"></div>

            <section className="flex justify-between">
              <h1>Teslimat Ücreti</h1>
              <h1>25₺</h1>
            </section>

            <div className="border my-2"></div>

            <section className="flex justify-between font-bold text-xl">
              <h1>Toplam</h1>
              <h1>{totalPrice + 25}₺</h1>
            </section>

            <button
              onClick={placeOrder}
              className="bg-orange-500 text-xl text-gray-100 px-16 py-3 font-semibold mt-7 rounded-xl"
            >
              Siparişi ver
            </button>
          </div>

          <form className="w-1/2">
            <h1 className="text-xl">
              Promosyon kodunuz varsa, buradan kullanabilirsiniz.
            </h1>
            <div className="flex mt-2">
              <input
                type="text"
                className="w-full rounded-md outline-none bg-gray-200 pl-2 "
                placeholder="promosyon kodu"
                required
              />
              <button className="text-lg rounded-md bg-gray-800 text-white px-14 py-2">
                Onayla
              </button>
            </div>
          </form>
        </section>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
