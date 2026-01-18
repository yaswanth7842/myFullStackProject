import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const isVideo = (url) =>
    url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");

  // max 5 images + 1 video (video last)
  const getMedia = (p) => {
    const media = p.imageUrls ? [...p.imageUrls] : [];
    if (p.videoPaths && p.videoPaths[0]) {
      media.push(p.videoPaths[0]);
    }
    return media;
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
        {products.map(p => {
          const media = getMedia(p);
          const mainMedia =
            activeProduct?.id === p.id ? media[activeIndex] : media[0];

          return (
            <div className="product-row" key={p.id}>
              {/* MEDIA */}
              <div className="image-section">
                {mainMedia && isVideo(mainMedia) ? (
                  <video
                    className="main-img"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    onClick={() => {
                      setActiveProduct(p);
                      setActiveIndex(activeIndex);
                    }}
                  >
                    <source
                      src={`http://localhost:8092${mainMedia}`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <img
                    className="main-img"
                    src={`http://localhost:8092${mainMedia}`}
                    alt={p.name}
                    onClick={() => {
                      setActiveProduct(p);
                      setActiveIndex(0);
                    }}
                  />
                )}

                {/* THUMBNAILS */}
                <div className="thumb-strip">
                  {media.map((m, i) =>
                    isVideo(m) ? (
                      <div
                        key={i}
                        className="thumb-video-wrapper"
                        onClick={() => {
                          setActiveProduct(p);
                          setActiveIndex(i);
                        }}
                      >
                        <video
                          className="thumb-video"
                          muted
                          playsInline
                          preload="metadata"
                        >
                          <source
                            src={`http://localhost:8092${m}`}
                            type="video/mp4"
                          />
                        </video>
                        <span className="play-icon">▶</span>
                      </div>
                    ) : (
                      <img
                        key={i}
                        src={`http://localhost:8092${m}`}
                        alt=""
                        onClick={() => {
                          setActiveProduct(p);
                          setActiveIndex(i);
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* INFO */}
              <div className="info-section">
                <h3>{p.name}</h3>
                <p className="desc">{p.description}</p>
                <div className="price">₹ {p.price}</div>
                <button onClick={() => addToCart(p.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEWER */}
      {activeProduct && (
        <div className="viewer" onClick={() => setActiveProduct(null)}>
          <div className="viewer-box" onClick={e => e.stopPropagation()}>
            {(() => {
              const media = getMedia(activeProduct);
              const m = media[activeIndex];
              if (!m) return null;

              return isVideo(m) ? (
                <video
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source
                    src={`http://localhost:8092${m}`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src={`http://localhost:8092${m}`}
                  alt=""
                />
              );
            })()}

            <div className="viewer-thumbs">
              {getMedia(activeProduct).map((m, i) =>
                isVideo(m) ? (
                  <div
                    key={i}
                    className="thumb-video-wrapper"
                    onClick={() => setActiveIndex(i)}
                  >
                    <video
                      className={i === activeIndex ? "active" : ""}
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source
                        src={`http://localhost:8092${m}`}
                        type="video/mp4"
                      />
                    </video>
                    <span className="play-icon">▶</span>
                  </div>
                ) : (
                  <img
                    key={i}
                    src={`http://localhost:8092${m}`}
                    alt=""
                    className={i === activeIndex ? "active" : ""}
                    onClick={() => setActiveIndex(i)}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
