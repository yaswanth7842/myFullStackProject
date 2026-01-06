import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8092/products/all")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8092/api/cart/add/${id}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => {
        if (!res.ok) throw new Error();
        alert("Added to cart ✅");
      })
      .catch(() => alert("Please login"));
  };

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <h2 className="brand">UrbanFurnish</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Productlist">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      {/* PRODUCT LIST */}
      <div className="product-page">
        {products.map(p => (
          <div className="product-row" key={p.id}>

            {/* LEFT IMAGES */}
            <div className="image-section">
              <img
                className="main-img"
                src={`http://localhost:8092${p.imageUrls?.[activeProduct?.id === p.id ? activeImg : 0]}`}
                alt={p.name}
                onClick={() => {
                  setActiveProduct(p);
                  setActiveImg(0);
                }}
              />

              <div className="thumb-strip">
                {p.imageUrls?.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:8092${img}`}
                    alt=""
                    onClick={() => {
                      setActiveProduct(p);
                      setActiveImg(i);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="info-section">
              <h3>{p.name}</h3>
              <p className="desc">{p.description}</p>

              <div className="price">₹ {p.price}</div>

              <button onClick={() => addToCart(p.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE VIEWER */}
      {activeProduct && (
        <div className="viewer" onClick={() => setActiveProduct(null)}>
          <div className="viewer-box" onClick={e => e.stopPropagation()}>
            <img
              src={`http://localhost:8092${activeProduct.imageUrls[activeImg]}`}
              alt=""
            />
            <div className="viewer-thumbs">
              {activeProduct.imageUrls.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:8092${img}`}
                  alt=""
                  className={i === activeImg ? "active" : ""}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
