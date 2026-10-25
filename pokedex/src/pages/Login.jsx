import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api.js';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        await login(form.username, form.password);
        navigate('/pokemons');
        } catch (err) {
        setError(err.status === 401 ? 'Wrong username or password.' : err.message);
        }
    };

    return (
        <div className="auth-page">
            <form className="card form auth-card" onSubmit={onSubmit}>
                <p className="eyebrow">Welcome back, Trainer</p>
                <h2>Log in to your Pokédex</h2>
                <p className="form-intro">Sign in to manage your Pokémon collection.</p>
                <label>
                    Username
                    <input name="username" autoComplete="username" placeholder="Your username" value={form.username} onChange={onChange} required />
                </label>
                <label>
                    Password
                    <input name="password" type="password" autoComplete="current-password" placeholder="Your password" value={form.password} onChange={onChange} required />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Log in</button>
                <p className="form-intro">New here? <Link to="/register">Create an account</Link></p>
            </form>
        </div>
    );
}
