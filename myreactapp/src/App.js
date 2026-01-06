import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<AddProduct />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
