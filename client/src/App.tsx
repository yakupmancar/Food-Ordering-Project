import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { AppProvider } from "./context/appContext";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 2xl:px-0">
        <AppProvider>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myOrders" element={<Orders />} />
          </Routes>
        </AppProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
