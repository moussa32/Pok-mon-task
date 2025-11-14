import { useQuery } from "@tanstack/react-query";
import client from "@/config/api-client";
import type { Pokemon } from "../types/Pokemon";

export interface PokemonDetail extends Pokemon {
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
  baseExperience: number;
}

export const usePokemon = (id: string) => {
  return useQuery<PokemonDetail>({
    queryKey: ["getPokemon", id],
    queryFn: async () => {
      const response: any = await client.get(`/api/v2/pokemon/${id}`);

      return {
        id: response.id,
        name: response.name,
        image:
          response.sprites?.other?.dream_world?.front_default ||
          response.sprites?.front_default ||
          "",
        types: response.types?.map((type: any) => type.type.name) || [],
        height: response.height,
        weight: response.weight,
        abilities:
          response.abilities?.map((ability: any) => ability.ability.name) || [],
        stats:
          response.stats?.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })) || [],
        baseExperience: response.base_experience,
      };
    },
  });
};
