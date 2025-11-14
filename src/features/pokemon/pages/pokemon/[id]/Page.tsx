import { useParams, Link } from "react-router";
import { usePokemon } from "../../../hooks/usePokemon";
import { Button } from "@/components/ui/button";
import { SlEnergy } from "react-icons/sl";

const PokemonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon, isLoading, error } = usePokemon(id || "");

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Error loading Pokémon data
          </h2>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  // Calculate max stat value for progress bars
  const maxStatValue = Math.max(
    ...pokemon.stats.map((stat) => stat.value),
    100
  );

  return (
    <div className="container mx-auto py-8">
      <Link to="/">
        <Button variant="outline" className="mb-6">
          ← Back to List
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Top Section - Name and ID */}
        <div className="p-6 border-b text-center space-y-4">
          <h1 className="text-3xl font-bold flex items-center justify-center capitalize gap-3">
            <SlEnergy className="text-yellow-400" size={32} />
            {pokemon.name}
          </h1>
          <p className="text-gray-500">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              {pokemon.image && (
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-400/10 rounded-full p-4">
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="w-64 h-64 object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="text-xl font-semibold">
                    {pokemon.height / 10} m
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="text-xl font-semibold">
                    {pokemon.weight / 10} kg
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Base Stats</h3>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="flex flex-col">
                      <div className="flex justify-between">
                        <div className="text-right">
                          <span className="text-sm font-medium capitalize">
                            {stat.name}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-bold">
                            {stat.value}
                          </span>
                        </div>
                      </div>

                      <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-gray-950 h-2.5 rounded-full"
                            style={{
                              width: `${(stat.value / maxStatValue) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Base Experience</h3>
                <div className="text-left">
                  <span className="text-2xl font-bold">
                    {pokemon.baseExperience} XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
