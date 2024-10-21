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
  const { selectedCategory } = useAppContext();
  const [foods, setFoods] = useState<FoodInterface[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/foods");
        setFoods(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoods();
  }, []);

  // If there is selectedCategory
  const filteredFoods = selectedCategory
    ? foods.filter((food) => food.category === selectedCategory)
    : foods;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-7">Top dishes near you</h1>

      <div className="flex flex-wrap items-center gap-x-[26.2px] gap-y-10">
        {filteredFoods.map((food) => (
          <Food
            key={food._id}
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
