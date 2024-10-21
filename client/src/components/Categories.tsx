import { useAppContext } from "../context/appContext";

const Categories = () => {
  const { selectedCategory, setSelectedCategory } = useAppContext();

  const categories = [
    {
      name: "Pizza",
      imageUrl:
        "https://images.pexels.com/photos/8444547/pexels-photo-8444547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Tavuk",
      imageUrl:
        "https://images.pexels.com/photos/27744717/pexels-photo-27744717/free-photo-of-gida-yemek-yiyecek-aksam-yemegi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Burger",
      imageUrl:
        "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Pide",
      imageUrl:
        "https://images.pexels.com/photos/7813742/pexels-photo-7813742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Çiğköfte",
      imageUrl:
        "https://images.pexels.com/photos/6034050/pexels-photo-6034050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Uzak Doğu",
      imageUrl:
        "https://images.pexels.com/photos/3147493/pexels-photo-3147493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Tatlı",
      imageUrl:
        "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="my-12">
      <h1 className="font-bold text-4xl mb-2">Explore our menu</h1>
      <p className="w-2/3 mb-8 font-semibold text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
        exercitationem ipsum rem mollitia praesentium nemo a expedita amet
        repellat harum provident architecto, fugiat porro. Soluta rem velit
        nobis temporibus! Qui.
      </p>
      <div className="flex items-center justify-between mx-20">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center gap-3 cursor-pointer"
            onClick={() => setSelectedCategory(category.name)}
          >
            <img
              src={category.imageUrl}
              className={`w-28 h-28 rounded-full object-cover ${selectedCategory === category.name ? "border-4 p-[2px] transition-all duration-150 border-orange-600" : ""}`}
            />
            <h1 className="font-semibold text-gray-500 text-lg">
              {category.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
