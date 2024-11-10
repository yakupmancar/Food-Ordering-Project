import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface contextProps {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Food: React.FC<contextProps> = ({
  _id,
  name,
  category,
  price,
  description,
  imageUrl,
}) => {
  const { user } = useUser();

  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    if (user && user.id) {
      addToCart(user.id, _id, name, category, price, imageUrl, 1);
      toast.success("Ürün sepete eklendi!", {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      console.error("Kullanıcı girişi yapılmadı.");
      toast.warning("Lütfen giriş yapınız.", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col rounded-2xl shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
      <section>
        <img
          src={imageUrl}
          className="w-full h-[235px] object-cover rounded-t-xl"
        />
      </section>
      <section className="mx-3 my-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[19px]">{name}</h1>
          <div className="flex text-orange-500 text-sm">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
        </div>
        <p className="font-semibold text-gray-500 text-sm">{description}</p>
        <div className="flex items-center justify-between mt-1 mx-1">
          <h1 className="text-orange-500 font-bold text-xl">{price}₺</h1>
          <button
            onClick={handleAddToCart}
            className="border px-2 rounded-full bg-orange-500 text-white font-semibold"
          >
            +
          </button>
        </div>
      </section>
    </div>
  );
};

export default Food;
