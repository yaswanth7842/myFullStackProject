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
import PasswordUpdate from "./pages/ForgotPassword.js";
import Deleteproducts from "./pages/Delete.js";
import SofaProductList from "./pages/SofaProducts.jsx";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";


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
        <Route path="/productList" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgotpassword" element={<PasswordUpdate/>}/>
        <Route path="/deleteproducts" element={<Deleteproducts/>}/>
        <Route path="/sofaproduct" element={<SofaProductList/>}/>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
