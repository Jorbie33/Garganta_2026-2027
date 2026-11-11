import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Shop from "./pages/Shop.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import { useShop } from "./ShopContext.jsx";

function RequireAuth({ children }) {
  const { user, ready } = useShop();
  const location = useLocation();
  if (!ready) return null;
  return user ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

export default function App() {
  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/guitars/:id" element={<ProductPage />} />
          <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
          <Route path="/orders" element={<RequireAuth><OrdersPage /></RequireAuth>} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">Zorbi Guitars. Guitars, set up and ready to play.</footer>
    </>
  );
}
