"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Data {
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

const Page = () => {
  const [data, setData] = useState<Data>();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const getPokemonDetail = async (url: string) => {
    setPokemonDetail(undefined);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPokemonDetail(data));
  };

  const nextPage = () => {
    fetch(data?.next!)
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  const prevPage = () => {
    fetch(data?.previous!)
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  return (
    <div>
      <section className="max-w-3xl w-full mx-auto">
        <h1 className="text-2xl ">Pokemon</h1>
        <Drawer>
          <ul>
            {data?.results.map((pokemon) => (
              <li key={pokemon.name}>
                <DrawerTrigger asChild>
                  <Button onClick={() => getPokemonDetail(pokemon.url)}>
                    {pokemon.name}
                  </Button>
                </DrawerTrigger>
              </li>
            ))}
          </ul>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{pokemonDetail?.name}</DrawerTitle>
                <DrawerDescription>
                  {/* Set your daily activity goal. */} Base Experience{" : "}
                  {pokemonDetail?.base_experience}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  {/* {pokemonDetail?.abilities.map((ability) => (
                    <div key={ability.ability.name}>{ability.ability.name}</div>
                  ))} */}
                  <Image
                    src={pokemonDetail?.sprites?.back_default!}
                    alt="pokemon"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="mt-3 h-[120px]"></div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        <Pagination>
          <PaginationContent className="w-full flex flex-row-reverse justify-between ">
            <PaginationItem>
              <PaginationNext onClick={nextPage} href="#" />
            </PaginationItem>
            {data?.previous && (
              <PaginationItem>
                <PaginationPrevious onClick={prevPage} href={"#"} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default Page;
