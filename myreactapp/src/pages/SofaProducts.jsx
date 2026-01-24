import "./ProductList.css";
import { useEffect, useState } from "react";

export default function SofaProduct() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const isVideo = (url) =>
    url?.endsWith(".mp4") ||
    url?.endsWith(".webm") ||
    url?.endsWith(".ogg");

  const getMedia = (p) => {
    const media = p?.imageUrls ? [...p.imageUrls] : [];
    if (p?.videoPaths?.[0]) media.push(p.videoPaths[0]);
    return media;
  };

  /* FETCH PRODUCTS */
  useEffect(() => {
    fetch("http://localhost:8092/products/all")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          setProduct(data[0]);
          setThumbnail(getMedia(data[0])[0]);
        }
      })
      .catch(console.error);
  }, []);

  const addToCart = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8092/api/cart/add/${id}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Added to cart ✅");
      })
      .catch(() => alert("Please login"));
  };

  if (!product) return null;

  const media = getMedia(product);

  /* PRICE LOGIC (IMPORTANT) */
  const mrp = product.price;
  const sellingPrice = product.offerPrice ?? product.price;

  return (
    <div className="product-container">
      {/* BREADCRUMB */}
      <p className="breadcrumb">
        <span>Home</span> / <span>Products</span> /
        <span> {product.category || "Category"}</span> /
        <span className="active"> {product.name}</span>
      </p>

      {/* MAIN PRODUCT */}
      <div className="product-layout">
        {/* IMAGE SECTION */}
        <div className="image-section">
          <div className="thumbnails">
            {media.map((m, i) =>
              isVideo(m) ? (
                <div
                  key={i}
                  className="thumb-video-wrapper"
                  onClick={() => setThumbnail(m)}
                >
                  <video muted playsInline preload="metadata">
                    <source
                      src={`http://localhost:8092${m}`}
                      type="video/mp4"
                    />
                  </video>
                  <span className="play-icon">▶</span>
                </div>
              ) : (
                <div
                  key={i}
                  className="thumbnail-box"
                  onClick={() => setThumbnail(m)}
                >
                  <img src={`http://localhost:8092${m}`} alt="" />
                </div>
              )
            )}
          </div>

          <div className="main-image">
            {thumbnail && isVideo(thumbnail) ? (
              <video
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
                className="main-video"
              >
                <source
                  src={`http://localhost:8092${thumbnail}`}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                src={`http://localhost:8092${thumbnail}`}
                alt={product.name}
              />
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="details-section">
          <h1>{product.name}</h1>

          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${product.rating > i ? "filled" : ""}`}
              >
                ★
              </span>
            ))}
            <span className="rating-value">
              ({product.rating || 0})
            </span>
          </div>

          {/* PRICE */}
          <div className="price-wrapper">
            <p className="old-price">MRP: ₹ {mrp}</p>
            <p className="offer-price">₹ {sellingPrice}</p>
          </div>

          <p className="about-title">About Product</p>
          <ul className="description">
            <li>{product.description}</li>
          </ul>

          <div className="actions">
            <button
              className="btn cart"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
            <button className="btn buy">Buy now</button>
          </div>
        </div>
      </div>

      {/* OTHER PRODUCTS */}
      <div className="other-products">
        <h2>Other Products</h2>

        <div className="other-grid">
          {products
            .filter((p) => p.id !== product.id)
            .map((p) => {
              const sell = p.offerPrice ?? p.price;

              return (
                <div
                  key={p.id}
                  className="other-card"
                  onClick={() => {
                    setProduct(p);
                    setThumbnail(getMedia(p)[0]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={`http://localhost:8092${p.imageUrls?.[0]}`}
                    alt={p.name}
                  />
                  <h4>{p.name}</h4>
                  <p className="old-price">₹ {p.price}</p>
                  <p className="offer-price">₹ {sell}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}