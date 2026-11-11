import { useEffect, useState } from "react";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      api.products({ search, ordering }).then(setProducts).catch((e) => setError(e.message));
    }, 200);
    return () => clearTimeout(t);
  }, [search, ordering]);

  return (
    <>
      <section className="hero">
        <h1>Guitars worth playing for years.</h1>
        <p>Electric, acoustic and classical. Every instrument is checked and set up before it ships.</p>
      </section>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search guitars"
          aria-label="Search guitars"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select aria-label="Sort" value={ordering} onChange={(e) => setOrdering(e.target.value)}>
          <option value="">Newest</option>
          <option value="price">Price: low to high</option>
          <option value="-price">Price: high to low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {error && <p className="notice error">{error}. Check that the Django server is running on port 8000.</p>}
      {!products && !error && <p className="muted">Loading guitars...</p>}
      {products && products.length === 0 && (
        <p className="muted">No guitars match "{search}". Try a different name.</p>
      )}
      <div className="grid">
        {products?.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
