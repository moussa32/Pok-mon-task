import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import client from "@/config/api-client";
import type { Pokemon, PokemonResponse } from "../types/Pokemon";

// Updated hook to support pagination
export const usePokemons = (offset: number = 0, limit: number = 20) => {
  return useQuery<{
    pokemons: Pokemon[];
    totalCount: number;
    totalPages: number;
  }>({
    queryKey: ["getPokemons", offset, limit],
    queryFn: async () => {
      // First, get the list of pokemons with pagination
      const response: PokemonResponse = await client.get(
        `/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );

      // Get total count for pagination
      const totalCount = response.count;
      const totalPages = Math.ceil(totalCount / limit);

      // Then, fetch detailed data for each pokemon using Promise.all
      const detailedPokemons = await Promise.all(
        response.results.map(async (pokemon) => {
          try {
            // Extract the ID from the URL (e.g., https://pokeapi.co/api/v2/pokemon/1/)
            const id =
              pokemon.url?.split("/").filter(Boolean).pop() || pokemon.name;
            const detailedData: any = await client.get(`/api/v2/pokemon/${id}`);

            return {
              id: detailedData.id,
              name: detailedData.name,
              image:
                detailedData.sprites?.other?.dream_world?.front_default ||
                detailedData.sprites?.front_default ||
                "",
              types:
                detailedData.types?.map((type: any) => type.type.name) || [],
            };
          } catch (error) {
            // Fallback to basic data if detailed fetch fails
            return {
              id: 0,
              name: pokemon.name,
              image: "",
              types: [],
            };
          }
        })
      );

      return {
        pokemons: detailedPokemons,
        totalCount,
        totalPages,
      };
    },
  });
};

// New hook for infinite scroll
export const useInfinitePokemons = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ["getInfinitePokemons"],
    queryFn: async ({ pageParam = 0 }) => {
      // Get the list of pokemons with pagination
      const response: PokemonResponse = await client.get(
        `/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
      );

      // Fetch detailed data for each pokemon
      const detailedPokemons = await Promise.all(
        response.results.map(async (pokemon) => {
          try {
            const id =
              pokemon.url?.split("/").filter(Boolean).pop() || pokemon.name;
            const detailedData: any = await client.get(`/api/v2/pokemon/${id}`);

            return {
              id: detailedData.id,
              name: detailedData.name,
              image:
                detailedData.sprites?.other?.dream_world?.front_default ||
                detailedData.sprites?.front_default ||
                "",
              types:
                detailedData.types?.map((type: any) => type.type.name) || [],
            };
          } catch (error) {
            return {
              id: 0,
              name: pokemon.name,
              image: "",
              types: [],
            };
          }
        })
      );

      return detailedPokemons;
    },
    getNextPageParam: (lastPage: Pokemon[], allPages: Pokemon[][]) => {
      // Return the offset for the next page
      return allPages.length * limit;
    },
    initialPageParam: 0,
  });
};
