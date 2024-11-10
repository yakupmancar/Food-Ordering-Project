import axios from "axios";
import { useEffect, useState } from "react";
import Food from "./Food";
import { useAppContext } from "../context/appContext";

interface FoodInterface {
  _id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl: string;
}

const Foods = () => {
  const { selectedCategory } = useAppContext(); // Kategori işlemleri için contex'ten ilgili fonksiyonu çekeriz.
  const [foods, setFoods] = useState<FoodInterface[]>([]); // Yemeklerin listesini tutmak ve güncellemek için oluştururuz.

  // Sayfa ilk açıldığında yemek verilerini veritabanından çekmiş oluruz;
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/foods");
        setFoods(response.data);
        console.log("Yemek verileri:", response.data);
      } catch (error) {
        console.log("Yemek verilerini çekme sırasında hata:", error);
      }
    };
    fetchFoods();
  }, []);

  // Seçilen belirli bir kategori varsa ona uygun yemekler döner, yoksa tüm yemekler döner;
  const filteredFoods = selectedCategory
    ? foods.filter((food) => food.category === selectedCategory)
    : foods;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-7">Yakınınızdaki en iyi yemekler</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 gap-y-10">
        {filteredFoods.map((food) => (
          <Food
            key={food._id}
            _id={food._id}
            name={food.name}
            category={food.category}
            price={food.price}
            description={food.description}
            imageUrl={food.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Foods;
