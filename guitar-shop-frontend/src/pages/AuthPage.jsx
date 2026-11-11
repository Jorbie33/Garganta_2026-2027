import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../ShopContext.jsx";

const EMPTY = { username: "", email: "", password: "", first_name: "", middle_name: "", last_name: "", gender: "" };

export default function AuthPage({ mode }) {
  const isLogin = mode === "login";
  const { login, register } = useShop();
  const navigate = useNavigate();
  const from = useLocation().state?.from || "/";
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (isLogin) await login(form.username, form.password);
      else await register(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.status === 401 ? "Username or password is incorrect." : err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="auth" onSubmit={submit}>
      <h1>{isLogin ? "Sign in" : "Create account"}</h1>

      <label>Username<input required value={form.username} onChange={set("username")} autoComplete="username" /></label>
      {!isLogin && <label>Email<input required type="email" value={form.email} onChange={set("email")} /></label>}
      <label>Password
        <input required type="password" minLength={isLogin ? undefined : 8} value={form.password}
          onChange={set("password")} autoComplete={isLogin ? "current-password" : "new-password"} />
      </label>

      {!isLogin && (
        <>
          <div className="row3">
            <label>First name<input value={form.first_name} onChange={set("first_name")} /></label>
            <label>Middle name<input value={form.middle_name} onChange={set("middle_name")} /></label>
            <label>Last name<input value={form.last_name} onChange={set("last_name")} /></label>
          </div>
          <label>Gender
            <select value={form.gender} onChange={set("gender")}>
              <option value="">Prefer not to say</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
              <option value="O">Other</option>
            </select>
          </label>
        </>
      )}

      {error && <p className="notice error">{error}</p>}
      <button className="btn" disabled={busy}>{isLogin ? "Sign in" : "Create account"}</button>
      <p className="muted">
        {isLogin ? <>New here? <Link to="/register" state={{ from }}>Create an account</Link></>
                 : <>Already have an account? <Link to="/login" state={{ from }}>Sign in</Link></>}
      </p>
    </form>
  );
}
