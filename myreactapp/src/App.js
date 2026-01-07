import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<AddProduct/>}/>
        <Route path="/productlist" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
