import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from './api.js';
import { isLoggedIn } from './auth.js';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Pokemons from './pages/Pokemons.jsx';
import Users from './pages/Users.jsx';

function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
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
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/pokemons" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pokemons" element={<Protected><Pokemons /></Protected>} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </>
  );
}
