import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";

const Orders = () => {
  const [orders, setOrders] = useState<any>(null); // Sipariş verilerini tutmak ve güncellemek için oluşturulur.
  const { user } = useUser();
  const userId = user?.id;

  // İlgili kullanıcının sipariş verilerini getirme fonksiyonu;
  const getOrders = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/myOrders/${userId}`
      );
      console.log("Siparişlerim", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Siparişlerin getirilmesi sırasında hata:", error);
      setOrders(null);
    }
  };

  // Kullanıcı değiştiğinde ilgili içeriğin de değiştirilmesi;
  useEffect(() => {
    if (userId) {
      getOrders(userId);
    }
  }, [userId]);

  // Sipariş tarihini daha okunaklı yapmak;
  const formatDate = (dateString: any) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", options);
  };

  return (
    <div className="my-20">
      {orders && orders.length > 0 ? (
        orders.map((order: any) => (
          <div
            key={order._id}
            className="border shadow-lg rounded-xl flex items-center justify-between gap-20 py-7 text-lg px-4 my-8"
          >
            <section className="flex w-1/3">
              {order.items.map((item: any) => (
                <div key={item._id}>
                  {item.foodName} x {item.quantity}
                  <span className="border-l border-gray-700 mx-2"></span>
                </div>
              ))}
            </section>
            <section>{order.totalPrice + 25}₺</section>
            <section>{formatDate(order.orderDate)}</section>
            <section className="flex items-center gap-2">
              <FaCheck className="text-green-500 text-2xl" />
              <span>Sipariş teslim edildi.</span>
            </section>
          </div>
        ))
      ) : (
        <h2 className="text-center text-2xl font-semibold">
          Henüz siparişiniz bulunmamaktadır.
        </h2>
      )}
    </div>
  );
};

export default Orders;
