import "./ProductList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8092";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const navigate = useNavigate();

  // fetch all products
  const fetchAllProducts = () => {
  const token = localStorage.getItem("token");

  fetch(`${BASE_URL}/products/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => setProducts([...data].reverse()))
    .catch(console.error);
};


  // fetch by category
  const fetchByCategory = (category) => {
  const token = localStorage.getItem("token");

  fetch(`${BASE_URL}/products/category/${category}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error("Forbidden");
      return res.json();
    })
    .then((data) => setProducts([...data].reverse()))
    .catch(console.error);
};




  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    if (category === "ALL") {
      fetchAllProducts();
    } else {
      fetchByCategory(category);
    }
  };

  return (
    <div className="ikea-container">

      {/* ===== CATEGORIES TOP RIGHT ===== */}
      <div className="category-bar">
        {["ALL", "Chairs", "Sofas", "Beds"].map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== PRODUCT GRID ===== */}
      <div className="ikea-grid">
  {products.map((p) => (
    <div
      key={p.id}
      className="ikea-card"
      onClick={() => navigate(`/product/${p.id}`)}
    >
      {p.imageUrls && p.imageUrls.length > 0 ? (
        <img
          src={`${BASE_URL}${p.imageUrls[0]}`}
          className="cursor-pointer"
          alt={p.name}
        />
      ) : (
        <div className="no-image">No Image</div>
      )}

      <h4>{p.name}</h4>
      <p className="desc">{p.description}</p>

      <div className="price">
        ₹ {p.offerPrice ?? p.price}
      </div>

      <div className="rating">
        {"★".repeat(p.rating || 4)}
        <span> ({p.rating || 40})</span>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
