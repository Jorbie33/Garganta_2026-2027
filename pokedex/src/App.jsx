import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from './api.js';
import { isLoggedIn } from './auth.js';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Gallery from './pages/Gallery.jsx';
import Users from './pages/Users.jsx';

function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function PublicOnly({ children }) {
  return isLoggedIn() ? <Navigate to="/pokemons" replace /> : children;
}

export default function App() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="nav">
        <strong>Pokedex</strong>
        <Link to="/pokemons">Pokémon</Link>
        <Link to="/users">Trainers</Link>
        <span className="spacer" />
        {loggedIn ? (
          <button type="button" onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link className="register-link" to="/register">Register</Link>
          </>
        )}
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/pokemons" replace />} />
          <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
          <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
          <Route path="/pokemons" element={<Protected><Gallery /></Protected>} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </>
  );
}
