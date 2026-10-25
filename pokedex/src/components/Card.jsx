import { mediaUrl } from '../api.js';

export default function Card({ pokemon, onEdit, onDelete }) {
return (
    <div
        className="card poke"
        style={{ backgroundImage: `linear-gradient(#fffc,#fffc), url(${mediaUrl(pokemon.background)})` }}
    >
        <img className="avatar" src={mediaUrl(pokemon.avatar)} alt={pokemon.name} />
        <h3>{pokemon.name} <small>({pokemon.type})</small></h3>
        <p>{pokemon.description}</p>
        <p>
        Lv {pokemon.level} · HP {pokemon.health} · ATK {pokemon.attack} · DEF {pokemon.defense} · SPD {pokemon.speed}
        </p>
    <div className="row">
        <button onClick={() => onEdit(pokemon)}>Edit</button>
        <button className="danger" onClick={() => onDelete(pokemon.id)}>Delete</button>
    </div>
    </div>
    );
}
