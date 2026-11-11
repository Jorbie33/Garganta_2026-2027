import { useState } from "react";
import { Link } from "react-router-dom";
import { money } from "../format.js";
import Thumb from "../components/Thumb.jsx";
import { useShop } from "../ShopContext.jsx";

export default function CartPage() {
  const { cart, setQuantity, removeItem, checkout } = useShop();
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const run = async (fn, okText) => {
    setBusy(true);
    try {
      await fn();
      setMsg(okText ? { type: "ok", text: okText } : null);
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setBusy(false);
    }
  };

  const done = msg?.type === "ok" && msg.text.startsWith("Order");

  if (!cart) return <p className="muted">Loading...</p>;
  if (cart.items.length === 0) {
    return (
      <>
        <h1>Your cart</h1>
        {msg && <p className={`notice ${msg.type}`}>{msg.text} {done && <Link to="/orders">View orders</Link>}</p>}
        {!done && <p className="muted">Your cart is empty. <Link to="/">Browse guitars</Link></p>}
      </>
    );
  }

  return (
    <>
      <h1>Your cart</h1>
      <div className="cart-list">
        {cart.items.map((item) => (
          <div className="cart-row" key={item.id}>
            <Thumb product={item.product} />
            <div className="cart-info">
              <Link to={`/guitars/${item.product.id}`}>{item.product.name}</Link>
              <span className="muted">{money(item.product.price)} each</span>
              <button className="link-btn" disabled={busy} onClick={() => run(() => removeItem(item.id))}>Remove</button>
            </div>
            <input
              type="number" min="1" max={item.product.stock} value={item.quantity} aria-label="Quantity"
              disabled={busy}
              onChange={(e) => run(() => setQuantity(item.id, Number(e.target.value) || 1))}
            />
            <strong className="line-total">{money(item.subtotal)}</strong>
          </div>
        ))}
      </div>

      <div className="summary">
        <span>Total</span>
        <strong>{money(cart.total)}</strong>
      </div>
      {msg && <p className={`notice ${msg.type}`}>{msg.text}</p>}
      <button className="btn" disabled={busy} onClick={() => run(checkout, "Order placed. Thank you!")}>
        Place order
      </button>
    </>
  );
}
