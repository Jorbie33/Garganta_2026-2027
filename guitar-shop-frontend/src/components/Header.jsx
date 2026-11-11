import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../ShopContext.jsx";

export default function Header() {
  const { user, count, logout } = useShop();
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="brand">Zorbi Guitars</Link>
      <nav className="nav" aria-label="Main">
        <NavLink to="/" end>Guitars</NavLink>
        {user && <NavLink to="/orders">Orders</NavLink>}
        <NavLink to="/cart">Cart{count > 0 && <span className="badge">{count}</span>}</NavLink>
        {user ? (
          <button className="link-btn" onClick={() => { logout(); navigate("/"); }}>
            Sign out ({user.username})
          </button>
        ) : (
          <NavLink to="/login">Sign in</NavLink>
        )}
      </nav>
    </header>
  );
}
