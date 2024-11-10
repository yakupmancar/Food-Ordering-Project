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
    <div className="my-9 lg:my-12">
      <h1 className="font-bold text-3xl lg:text-4xl mb-2">Explore our menu</h1>
      <p className="lg:w-2/3 mb-10 lg:mb-14 font-semibold text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
        exercitationem ipsum rem mollitia praesentium nemo a expedita amet
        repellat harum provident architecto, fugiat porro. Soluta rem velit
        nobis temporibus! Qui.
      </p>
      <div className="flex flex-wrap gap-y-5 items-center sm:justify-between gap-5 sm:gap-0 xl:mx-32 md:mx-20 sm:mx-10">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center md:gap-3 cursor-pointer"
            onClick={() => setSelectedCategory(category.name)}
          >
            <img
              src={category.imageUrl}
              className={`lg:w-28 md:w-20 md:h-20 w-16 h-16 lg:h-28 rounded-full object-cover ${selectedCategory === category.name ? "border-4 p-[2px] transition-all duration-150 border-orange-600" : ""}`}
            />
            <h1 className="font-semibold text-gray-500 text-md xl:text-lg">
              {category.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
