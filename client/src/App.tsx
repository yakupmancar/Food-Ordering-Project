import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { AppProvider } from "./context/appContext";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <AppProvider>
                <Home />
              </AppProvider>
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
