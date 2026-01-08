import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Deleteproducts() {
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const deleteproducts = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8092/products/deleteproducts/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.text();
    setMessage(data);

    if (data === "Product deleted successfully") {
      navigate("/productlist");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter product id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={deleteproducts}>Delete</button>
      <p>{message}</p>
    </div>
  );
}

export default Deleteproducts;
