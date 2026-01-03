import { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8092/api/cart/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const removeItem = (cartItemId) => {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:8092/api/cart/remove/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error("Delete failed");
      setItems(prev => prev.filter(item => item.id !== cartItemId));
    })
    .catch(err => console.error(err));
};



  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        items.map(item => (
          <div className="cart-item" key={item.id}>
            
            <img
              className="cart-img"
              src={`http://localhost:8092${item.product.imageUrls?.[0]}`}
              alt={item.product.name}
            />

            <div className="cart-info">
              <h3>{item.product.name}</h3>
              <p>₹ {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
