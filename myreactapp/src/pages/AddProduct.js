import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setProduct({ ...product, images: Array.from(files) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.images.length < 1 || product.images.length > 5) {
      alert("Select minimum 1 and maximum 5 images");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);

    product.images.forEach((img) => {
      formData.append("images", img); // ✅ VERY IMPORTANT
    });

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8092/products/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        alert("Product added successfully");
        setProduct({ name: "", description: "", price: "", images: [] });
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="add-container">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
