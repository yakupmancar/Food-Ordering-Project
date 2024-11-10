import mainPhoto from "../assets/img/pizza1.jpg";

const Main = () => {
  return (
    <div className="relative">
      <img
        src={mainPhoto}
        className="w-full md:h-[500px] object-cover mt-6 rounded-2xl shadow-2xl"
      />

      <div className="absolute top-28 w-1/2 ml-24 hidden md:flex flex-col">
        <h1 className="text-3xl md:text-4xl xl:text-5xl text-white font-semibold">
          Order your <br /> favourite food here
        </h1>
        <span className="text-white text-sm md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
          sequi adipisci officia non dicta! Accusamus inventore iure
          praesentium, quae quia tenetur consectetur totam quod placeat fuga
          iste assumenda ipsa perferendis, est aliquam repudiandae maiores sit
          aperiam quos? Perferendis, eos voluptas.
        </span>
        <button className="bg-gray-300 w-32 py-2 rounded-full mt-5">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Main;
