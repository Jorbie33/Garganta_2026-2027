import Card from './Card.jsx';

export default function GalleryPokemon({ pokemons, onEdit, onDelete }) {
    if (pokemons.length === 0) {
        return <p className="empty-state">Your collection is waiting. Add your first Pokémon to get started!</p>;
    }

    return (
        <div className="grid">
            {pokemons.map((p) => (
                <Card key={p.id} pokemon={p} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}