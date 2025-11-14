import { Link } from "react-router";
import type { Pokemon } from "../types/Pokemon";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="bg-white p-6 rounded flex flex-col space-y-3 shadow">
        <div className="w-full h-40 bg-gray-400/10">
          {pokemon.image && (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-32 h-40 mx-auto"
            />
          )}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
          <p className="text-gray-500">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
