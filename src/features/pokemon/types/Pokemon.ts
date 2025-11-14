export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  url?: string; // Make url optional since it's only in the list response
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
