import { useEffect, useState } from 'react';
import { createPokemon, deletePokemon, getPokemons, mediaUrl, updatePokemon } from '../api.js';
import { formatErrors } from '../auth.js';

const TYPES = ['water', 'fire', 'wind', 'light', 'darkness', 'lightning', 'rock', 'nature'];
const EMPTY = {
    name: '', description: '', type: 'fire', level: 1,
    health: 100, attack: 10, defense: 5, speed: 15,
};

export default function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [files, setFiles] = useState({ avatar: null, background: null });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const load = () => getPokemons().then(setPokemons).catch((e) => setError(formatErrors(e)));
    useEffect(() => { load(); }, []);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const onFile = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] ?? null });

const reset = () => {
    setForm(EMPTY);
    setFiles({ avatar: null, background: null });
    setEditingId(null);
    setError('');
};

const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Images require multipart/form-data, so we use FormData.
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
    if (files.avatar) fd.append('avatar', files.avatar);
    if (files.background) fd.append('background', files.background);

try {
        if (editingId) await updatePokemon(editingId, fd);
        else await createPokemon(fd);
        reset();
        load();
    } catch (err) {
    setError(formatErrors(err));
    }
};

const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
        name: p.name, description: p.description ?? '', type: p.type, level: p.level,
        health: p.health, attack: p.attack, defense: p.defense, speed: p.speed,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const remove = async (id) => {
    if (!confirm('Delete this Pokémon?')) return;
    try {
        await deletePokemon(id);
        load();
    } catch (err) {
    setError(formatErrors(err));
    }
};

const num = (name, label, min) => (
    <label>{label}
        <input name={name} type="number" min={min} value={form[name]} onChange={onChange} required />
    </label>
);

return (
    <>
    <form className="card form" onSubmit={onSubmit}>
        <h2>{editingId ? `Edit Pokémon #${editingId}` : 'Add Pokémon'}</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} />
        <label>Type
            <select name="type" value={form.type} onChange={onChange}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
        </label>
        <div className="row">
            {num('level', 'Level (min 1)', 1)}
            {num('health', 'Health (min 100)', 100)}
            {num('attack', 'Attack (min 10)', 10)}
            {num('defense', 'Defense (min 5)', 5)}
            {num('speed', 'Speed (min 15)', 15)}
        </div>
        <label>Avatar <input name="avatar" type="file" accept="image/*" onChange={onFile} /></label>
        <label>Background <input name="background" type="file" accept="image/*" onChange={onFile} /></label>
        {error && <p className="error">{error}</p>}
        <div className="row">
            <button type="submit">{editingId ? 'Save changes' : 'Create'}</button>
            {editingId && <button type="button" onClick={reset}>Cancel</button>}
        </div>
    </form>

    <div className="grid">
        {pokemons.map((p) => (
        <div className="card poke" key={p.id}
            style={{ backgroundImage: `linear-gradient(#fffc,#fffc), url(${mediaUrl(p.background)})` }}>
            <img className="avatar" src={mediaUrl(p.avatar)} alt={p.name} />
            <h3>{p.name} <small>({p.type})</small></h3>
            <p>{p.description}</p>
            <p>Lv {p.level} · HP {p.health} · ATK {p.attack} · DEF {p.defense} · SPD {p.speed}</p>
            <div className="row">
                <button onClick={() => startEdit(p)}>Edit</button>
                <button className="danger" onClick={() => remove(p.id)}>Delete</button>
            </div>
        </div>
        ))}
    </div>
    </>
);
}
