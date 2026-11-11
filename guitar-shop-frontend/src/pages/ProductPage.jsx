import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";
import { money } from "../format.js";
import Thumb from "../components/Thumb.jsx";
import { useShop } from "../ShopContext.jsx";

export default function ProductPage() {
  const { id } = useParams();
  const { user, addToCart } = useShop();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    api.product(id).then(setProduct).catch(() => setMsg({ type: "error", text: "This guitar could not be found." }));
  }, [id]);

  const add = async () => {
    if (!user) return navigate("/login", { state: { from: `/guitars/${id}` } });
    try {
      await addToCart(product.id, qty);
      setMsg({ type: "ok", text: "Added to your cart." });
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    }
  };

  if (!product) return msg ? <p className="notice error">{msg.text}</p> : <p className="muted">Loading...</p>;

  const soldOut = product.stock < 1;
  return (
    <>
      <Link to="/" className="back">Back to guitars</Link>
      <div className="detail">
        <Thumb product={product} />
        <div>
          <h1>{product.name}</h1>
          <p className="price big">{money(product.price)}</p>
          <p className="desc">{product.description}</p>
          <p className="muted">SKU {product.sku}. {soldOut ? "Sold out." : `${product.stock} in stock.`}</p>

          {!soldOut && (
            <div className="buy-row">
              <label>
                Quantity
                <input type="number" min="1" max={product.stock} value={qty}
                  onChange={(e) => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1)))} />
              </label>
              <button className="btn" onClick={add}>Add to cart</button>
            </div>
          )}
          {msg && (
            <p className={`notice ${msg.type}`}>
              {msg.text} {msg.type === "ok" && <Link to="/cart">View cart</Link>}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
