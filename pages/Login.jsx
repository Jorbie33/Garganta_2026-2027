import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <form className="card form" onSubmit={onSubmit}>
        <h2>Log in</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Log in</button>
    </form>
    );
}
