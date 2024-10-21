import Categories from "../components/Categories"
import Foods from "../components/Foods"
import Main from "../components/Main"

const Home = () => {
  return (
    <div>
      <Main />
      <Categories />
      <div className="border-2 font-semibold rounded-2xl my-10"></div>
      <Foods />
    </div>
  )
}

export default Home