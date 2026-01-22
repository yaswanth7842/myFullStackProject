import React, { useEffect, useState } from "react";
import "./AddProduct.css";

const AddProducts = () => {

  /* ================= ADD PRODUCT ================= */
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",        // MRP
    offerPrice: "",   // Selling price
    images: [],
    video: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setProduct({ ...product, images: Array.from(files) });
    } else if (name === "video") {
      setProduct({ ...product, video: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("price", product.price);           
      formData.append(
        "offerPrice",
        product.offerPrice || product.price   // SAFE FALLBACK
      );

      product.images.forEach(img => formData.append("images", img));
      if (product.video) formData.append("videos", product.video);

      const res = await fetch("http://localhost:8092/products/add", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) {
        alert("Admin login required or invalid data");
        return;
      }

      alert("Product added successfully ✅");
      fetchProducts();

    } catch {
      alert("Server not reachable");
    }
  };

  /* ================= PRODUCTS ================= */
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://localhost:8092/products/all")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => alert("Failed to load products"));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this product?")) return;

    const res = await fetch(
      `http://localhost:8092/products/deleteproducts/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    alert("Product deleted");
    fetchProducts();
  };

  /* ================= UPDATE ================= */
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    price: "",
    offerPrice: ""
  });

  const openUpdate = (p) => {
    setEditProduct({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price,
      offerPrice: p.offerPrice ?? p.price   // SAFE
    });
    setShowModal(true);
  };

  const handleUpdateChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      ...editProduct,
      offerPrice: editProduct.offerPrice || editProduct.price
    };

    const res = await fetch(
      `http://localhost:8092/products/update/${editProduct.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      }
    );

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    alert("Product updated");
    setShowModal(false);
    fetchProducts();
  };

  return (
    <>
      {/* ================= ADD PRODUCT ================= */}
      <div className="add-container">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Product Name" onChange={handleChange} required />

          <select name="category" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Shoes">Shoes</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Sports">Sports</option>
          </select>

          <input name="description" placeholder="Description" onChange={handleChange} required />

          <div className="price-group">
            <input name="price" placeholder="MRP Price" required onChange={handleChange} />
            <input name="offerPrice" placeholder="Selling Price" onChange={handleChange} />
          </div>

          <input type="file" name="images" multiple onChange={handleChange} />
          <input type="file" name="video" onChange={handleChange} />

          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* ================= PRODUCT LIST ================= */}
      <div className="product-page">
        {products.map(p => {
          const sell = p.offerPrice ?? p.price;

          return (
            <div className="product-row" key={p.id}>
              <div className="offer-badge">₹ {sell}</div>

              <img
                className="main-img"
                src={`http://localhost:8092${p.imageUrls?.[0]}`}
                alt={p.name}
              />

              <div className="info-section">
                <h3>{p.name}</h3>
                <p className="desc">{p.description}</p>

                <p className="old-price">MRP: ₹ {p.price}</p>
                <div className="price">₹ {sell}</div>

                <div className="admin-actions">
                  <button onClick={() => openUpdate(p)}>Update</button>
                  <button className="danger" onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Update Product</h3>

            <form onSubmit={updateProduct}>
              <input value={editProduct.id} disabled />
              <input name="name" value={editProduct.name} placeholder="Product Name" onChange={handleUpdateChange} />
              <input name="category" value={editProduct.category} placeholder="Category" onChange={handleUpdateChange} />
              <input name="description" value={editProduct.description} placeholder="Description" onChange={handleUpdateChange} />
              <input name="price" value={editProduct.price} placeholder="MRP Price" onChange={handleUpdateChange} />
              <input name="offerPrice" value={editProduct.offerPrice} placeholder="Selling Price" onChange={handleUpdateChange} />
              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" className="cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProducts;
