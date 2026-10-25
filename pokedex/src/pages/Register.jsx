import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

        if (form.password !== form.confirm_password) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await register({ ...form, level: Number(form.level) });
            navigate('/login');
        } catch (err) {
            setError(formatErrors(err));
        }
    };

    return (
        <div className="auth-page">
            <form className="card form auth-card" onSubmit={onSubmit}>
                <p className="eyebrow">Join the adventure</p>
                <h2>Create your Trainer account</h2>
                <p className="form-intro">Set up your profile and start building your Pokédex.</p>
                <label>Username
                    <input name="username" autoComplete="username" placeholder="Choose a username" value={form.username} onChange={onChange} required />
                </label>
                <label>Email
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
                </label>
                <div className="row">
                    <label>First name
                        <input name="first_name" autoComplete="given-name" placeholder="First name" value={form.first_name} onChange={onChange} required />
                    </label>
                    <label>Last name
                        <input name="last_name" autoComplete="family-name" placeholder="Last name" value={form.last_name} onChange={onChange} required />
                    </label>
                </div>
                <label>Trainer level
                    <input name="level" type="number" min="1" placeholder="Level" value={form.level} onChange={onChange} required />
                </label>
                <label>Password
                    <input name="password" type="password" autoComplete="new-password" placeholder="Create a password" value={form.password} onChange={onChange} required />
                </label>
                <label>Confirm password
                    <input name="confirm_password" type="password" autoComplete="new-password" placeholder="Enter it again" value={form.confirm_password} onChange={onChange} required />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Create account</button>
                <p className="form-intro">Already registered? <Link to="/login">Log in</Link></p>
            </form>
        </div>
    );
}
