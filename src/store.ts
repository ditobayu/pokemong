import { create } from "zustand";

interface Pokemons {
  count: number;
  next: string;
  previous: string;
  results: Array<{ name: string; url: string }>;
}

interface PokemonDetail {
  abilities: Array<{ ability: { name: string; url: string } }>;
  base_experience: number;
  cries: { latest: string; legacy: string };
  forms: Array<{ name: string; url: string }>;
  game_indices: Array<{
    game_index: number;
    version: { name: string; url: string };
  }>;
  height: number;
  held_items: Array<{ item: { name: string; url: string } }>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<{ move: { name: string; url: string } }>;
  name: string;
  order: number;
  species: { name: string; url: string };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
}

type PokemonStore = {
  pokemons: Pokemons | undefined;
  pokemonDetail: PokemonDetail | undefined;
  pokemonCurrentIndex: number;
  isLoading: boolean;
  nextPage: () => void;
  prevPage: () => void;
  fetchPokemons: () => void;
  getPokemonDetail: (url: string) => void;
  findPokemon: (searchForm: string) => void;
};

const usePokemonStore = create<PokemonStore>((set, get) => ({
  pokemons: undefined,
  pokemonDetail: undefined,
  pokemonCurrentIndex: 1,
  isLoading: false,
  fetchPokemons: () => {
    set({ isLoading: true });
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => response.json())
      .then((pokemons) => {
        set({ pokemons, isLoading: false });
      });
  },
  findPokemon: async (searchForm: string) => {
    set({ isLoading: true, pokemonDetail: undefined });
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchForm}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        return response.json();
      })
      .then((data) => {
        set({ pokemonDetail: data });
      })
      .catch((error) => {
        console.log(error.message);
        set({ pokemonDetail: undefined });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getPokemonDetail: async (url: string) => {
    set({ isLoading: true });
    set({ pokemonDetail: undefined });
    fetch(url)
      .then((response) => response.json())
      .then((pokemonDetail) => {
        set({ pokemonDetail, isLoading: false });
      });
  },

  nextPage: async () => {
    const { pokemons, pokemonCurrentIndex } = get();
    if (pokemons && pokemons.next) {
      set({ pokemons: undefined });
      fetch(pokemons.next)
        .then((response) => response.json())
        .then((pokemons) => {
          set({ pokemons, pokemonCurrentIndex: pokemonCurrentIndex + 20 });
        });
    }
  },
  prevPage: () => {
    const { pokemons, pokemonCurrentIndex } = get();
    if (pokemons && pokemons.previous) {
      set({ pokemons: undefined });
      fetch(pokemons.previous)
        .then((response) => response.json())
        .then((pokemons) => {
          set({ pokemons, pokemonCurrentIndex: pokemonCurrentIndex - 20 });
        });
    }
  },
}));

export default usePokemonStore;
