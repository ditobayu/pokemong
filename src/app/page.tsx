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
import { Input } from "@/components/ui/input";
import {
  PokemonDetail,
  PokemonDetailSkeleton,
} from "@/components/ui/pokemonDetail";
import { Skeleton } from "@/components/ui/skeleton";
import usePokemonStore from "@/store";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [searchForm, setSearchForm] = useState<string>("");
  const {
    pokemons,
    nextPage,
    prevPage,
    fetchPokemons,
    getPokemonDetail,
    findPokemon,
    pokemonDetail,
    pokemonCurrentIndex,
    isLoading,
  } = usePokemonStore();
  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);
  return (
    <div>
      <section className="max-w-3xl w-full mx-auto px-4">
        <h1 className="text-2xl font-semibold my-8">Pokemon</h1>
        <Drawer>
          <div className="flex flex-row justify-between items-center my-4">
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                placeholder="Pencarian..."
                onChange={(e) => setSearchForm(e.target.value.toLowerCase())}
              />
              <DrawerTrigger asChild>
                <Button
                  size="icon"
                  className="p-2"
                  onClick={() => {
                    console.log(searchForm);
                    findPokemon(searchForm);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-search h-full w-full"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Button>
              </DrawerTrigger>
            </div>
            <p className="w-max text-sm">
              {pokemonCurrentIndex} - {pokemonCurrentIndex + 19} /{" "}
              {pokemons?.count}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pokemons
              ? pokemons?.results.map((pokemon) => (
                  <DrawerTrigger key={pokemon.name} asChild>
                    <Button
                      variant="green"
                      onClick={() => getPokemonDetail(pokemon.url)}
                    >
                      {pokemon.name}
                    </Button>
                  </DrawerTrigger>
                ))
              : Array.from(Array(20)).map((val, index) => (
                  <Skeleton key={index} className="h-9 w-full" />
                ))}
          </div>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              {pokemonDetail ? (
                <PokemonDetail pokemonDetail={pokemonDetail} />
              ) : isLoading ? (
                <PokemonDetailSkeleton />
              ) : (
                <h1>Data Tidak ada</h1>
              )}

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        <div className="flex flex-row-reverse justify-between my-4">
          <Button variant="ghost" onClick={nextPage}>
            Next
          </Button>
          <Button variant="ghost" onClick={prevPage}>
            Prev
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Page;
