import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../types/Pokemon";

interface PokemonGridProps {
  pokemons: Pokemon[];
  loadingType: "pagination" | "infinite";
  lastPokemonElementRef?: React.RefObject<HTMLDivElement | null>;
}

const PokemonGrid = ({
  pokemons,
  loadingType,
  lastPokemonElementRef,
}: PokemonGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pokemons?.map((pokemon, index) => (
        <div
          ref={
            loadingType === "infinite" && index === pokemons.length - 1
              ? lastPokemonElementRef
              : null
          }
          key={pokemon.name}
        >
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;
