import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { date, money } from "../format.js";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { api.transactions().then(setOrders).catch((e) => setError(e.message)); }, []);

  return (
    <>
      <h1>Your orders</h1>
      {error && <p className="notice error">{error}</p>}
      {orders && orders.length === 0 && <p className="muted">No orders yet. <Link to="/">Browse guitars</Link></p>}
      {orders?.map((o) => (
        <section className="order" key={o.id}>
          <header>
            <strong>Order #{o.id}</strong>
            <span className="muted">{date(o.created_at)}</span>
            <strong>{money(o.total)}</strong>
          </header>
          <ul>
            {o.lines.map((l) => (
              <li key={l.id}>
                <span>{l.quantity} x {l.item.name}</span>
                <span>{money(l.quantity * l.unit_price)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
