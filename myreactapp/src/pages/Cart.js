import { useEffect, useState } from "react";
import "./Cart.css";

const BASE_URL = "http://localhost:8092";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/cart/all`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const removeItem = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/api/cart/remove/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => {
          const p = item.product;
          return (
            <div className="cart-item" key={item.id}>
              <img
                src={`${BASE_URL}${p.imageUrls?.[0]}`}
                alt={p.name}
                className="cart-img"
              />

              <div className="cart-info">
                <h3>{p.name}</h3>
                <p>₹ {p.offerPrice ?? p.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Cart;
