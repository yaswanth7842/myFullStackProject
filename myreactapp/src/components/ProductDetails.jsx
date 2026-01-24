import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8092";

export default function ProductDetails() {
    const [addedToCart, setAddedToCart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeMedia, setActiveMedia] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= PRODUCT DETAILS ================= */
  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}/products/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setActiveMedia(
          data.imageUrls?.[0] || data.videoPaths?.[0] || ""
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= RELATED PRODUCTS ================= */
  useEffect(() => {
    fetch(`${BASE_URL}/products/all`)
      .then((res) => res.json())
      .then((data) => {
        const latest = data
          .filter((p) => String(p.id) !== String(id))
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);

        setRelatedProducts(latest);
      });
  }, [id]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:8092/api/cart/add/${product.id}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!res.ok) throw new Error();

    // ✅ SHOW MESSAGE
    setAddedToCart(true);

    // auto-hide after 2 sec
    setTimeout(() => setAddedToCart(false), 2000);
  } catch {
    alert("Failed to add product");
  }
};


  if (loading || !product) return null;

  const resolveUrl = (url) =>
    url?.startsWith("http") ? url : `${BASE_URL}${url}`;

  const isVideo = (url) =>
    url?.endsWith(".mp4") ||
    url?.endsWith(".webm") ||
    url?.endsWith(".ogg");

  const mediaList = [
    ...(product.imageUrls || []),
    ...(product.videoPaths || []),
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16">

        {/* LEFT MEDIA */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {mediaList.map((m, i) => (
              <div
                key={i}
                onClick={() => setActiveMedia(m)}
                className={`border p-1 cursor-pointer ${
                  activeMedia === m ? "border-black" : "border-gray-300"
                }`}
              >
                {isVideo(m) ? (
                  <video src={resolveUrl(m)} muted className="w-20 h-20 object-cover" />
                ) : (
                  <img src={resolveUrl(m)} className="w-20 h-20 object-cover" alt="" />
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 border h-[520px] flex items-center justify-center bg-gray-50">
            {isVideo(activeMedia) ? (
              <video controls className="w-full h-full object-contain">
                <source src={resolveUrl(activeMedia)} />
              </video>
            ) : (
              <img src={resolveUrl(activeMedia)} className="w-full h-full object-contain" alt="" />
            )}
          </div>
        </div>

        {/* RIGHT BUY BOX */}
  
<div className="space-y-5">
  <h1 className="text-2xl font-bold">{product.name}</h1>
  <p className="text-gray-600">{product.description}</p>
  <p className="text-3xl font-bold">
    ₹{product.offerPrice ?? product.price}
  </p>

  {/* ✅ SUCCESS MESSAGE */}
  {addedToCart && (
    <p className="text-green-600 font-semibold text-center">
      ✔ Product added to cart
    </p>
  )}

  <button
    onClick={handleAddToCart}
    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full font-semibold"
  >
    Add to bag
  </button>
</div>

      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">Related products</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              className="cursor-pointer"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <div className="border h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={resolveUrl(p.imageUrls?.[0])}
                  className="h-full object-contain"
                  alt=""
                />
              </div>
              <h3 className="mt-2 text-sm font-semibold">{p.name}</h3>
              <p className="text-sm font-bold">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
