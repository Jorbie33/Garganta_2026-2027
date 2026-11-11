import { Link } from "react-router-dom";
import { money } from "../format.js";
import Thumb from "./Thumb.jsx";

export default function ProductCard({ product }) {
  return (
    <Link to={`/guitars/${product.id}`} className="card">
      <Thumb product={product} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <div className="card-meta">
          <span className="price">{money(product.price)}</span>
          <span className={product.stock > 0 ? "stock" : "stock out"}>
            {product.stock > 0 ? (product.stock <= 3 ? `Only ${product.stock} left` : "In stock") : "Sold out"}
          </span>
        </div>
      </div>
    </Link>
  );
}
