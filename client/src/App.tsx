import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { AppProvider } from "./context/appContext";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto">
        <AppProvider>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          <Footer />
        </AppProvider>
      </div>
    </Router>
  );
}

export default App;
