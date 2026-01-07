import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
<<<<<<< HEAD
import ForgotPassword from "./pages/ForgotPassword.js";
=======
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
>>>>>>> a1212b3fb4c4c58c1d13372480fc736c67fa8f19

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
        <Route path="/product" element={<AddProduct/>}/>
        <Route path="/productlist" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
=======
        <Route path="/product" element={<AddProduct />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
>>>>>>> a1212b3fb4c4c58c1d13372480fc736c67fa8f19
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
