import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useUser } from "@clerk/clerk-react";

const Cart = () => {
  const { getCart, cart } = useAppContext();
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

  return (
    <div>
      <table className="w-full text-left mt-20">
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
                <td className="pl-4">{item.quantity}</td>
                <td className="pl-2">{item.foodPrice * item.quantity}₺</td>
                <td className="text-2xl pl-3">X</td>
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

          <button className="bg-orange-500 text-xl text-gray-100 px-16 py-3 font-semibold mt-7 rounded-xl">Siparişi ver</button>
        </div>

        <div className="bg-gray-300 w-1/2">blabla</div>
      </section>
    </div>
  );
};

export default Cart;
