import React from "react";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "./drawer";
import Image from "next/image";
import { Skeleton } from "./skeleton";

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
export const PokemonDetail = ({
  pokemonDetail,
}: {
  pokemonDetail: PokemonDetail;
}) => {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle>{pokemonDetail?.name}</DrawerTitle>
        <DrawerDescription>
          Base Experience{" : "}
          {pokemonDetail?.base_experience}
        </DrawerDescription>
      </DrawerHeader>

      <Image
        src={pokemonDetail?.sprites?.back_default!}
        alt="pokemon"
        width={400}
        height={400}
      />
      <div className="text-sm px-4 text-slate-600">
        {/* height  */}
        <label>ID : </label>
        <span>{pokemonDetail?.id}</span>
        <br />
        <label>Height : </label>
        <span>{pokemonDetail?.height}</span>
        <br />
        <label>Species : </label>
        <span>{pokemonDetail?.species?.name}</span>
        <br />
        <label>Held Items : </label>
        <span>
          {pokemonDetail?.held_items?.length !== 0
            ? pokemonDetail?.held_items?.map((item) => (
                <span key={item.item.name}>{item.item.name}</span>
              ))
            : "No held items"}
        </span>
        <br />
      </div>
    </>
  );
};

export const PokemonDetailSkeleton = () => {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle>
          <Skeleton className="h-4 w-36" />
        </DrawerTitle>
        <DrawerDescription>
          <Skeleton className="h-4 w-72" />
        </DrawerDescription>
      </DrawerHeader>

      <Skeleton className="w-[400px] h-[400px]" />
      <div className="gap-2 px-4 flex flex-col mt-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-72" />
      </div>
    </>
  );
};
