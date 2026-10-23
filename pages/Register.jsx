import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api.js';
import { formatErrors } from '../auth.js';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    username: '', email: '', first_name: '', last_name: '',
    level: 1, password: '', confirm_password: '',
});
    const [error, setError] = useState('');

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        await register({ ...form, level: Number(form.level) });
        navigate('/login');
    } catch (err) {
        setError(formatErrors(err));
    }
    };
}

return(
    <form className="card form" onSubmit={onSubmit}>
    <h2>Register</h2>
    <input name="username" placeholder="Username" value={form.username} onChange={onChange} required />
    <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
    <input name="first_name" placeholder="First Name" value={form.first_name} onChange={onChange} required />
    <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={onChange} required />
    <input name="level" type="number" placeholder="Level" value={form.level} onChange={onChange} required />
    <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
    <input name="confirm_password" type="password" placeholder="Confirm Password" value={form.confirm_password} onChange={onChange} required />
    {error && <p className="error">{error}</p>}
    <button type="submit">Register</button>
    </form>
);

