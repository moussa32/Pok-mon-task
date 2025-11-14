import PokemonCard from "../components/PokemonCard";
import SkeletonPokemonCard from "../components/SkeletonPokemonCard";
import { usePokemons, useInfinitePokemons } from "../hooks/usePokemons";
import type { LoadingType } from "../types/LoadingTypes";
import { SlEnergy } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState, useEffect, useRef } from "react";

const LoadingTypes = [
  {
    type: "pagination",
    message: "page controls",
  },
  { type: "infinite", message: "infinite scroll" },
];

const Homepage = () => {
  const [loadingType, setLoadingType] = useState<LoadingType>({
    type: "pagination",
    message: "page controls",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const POKEMONS_PER_PAGE = 20;

  // For pagination
  const { data: paginatedData, isLoading: isPaginationLoading } = usePokemons(
    (currentPage - 1) * POKEMONS_PER_PAGE,
    POKEMONS_PER_PAGE
  );

  // For infinite scroll
  const {
    data: infiniteData,
    isLoading: isInfiniteLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePokemons(POKEMONS_PER_PAGE);

  // For infinite scroll - observer reference
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonElementRef = useRef<HTMLDivElement>(null);

  // Handle infinite scroll
  useEffect(() => {
    if (loadingType.type !== "infinite") return;

    if (isFetchingNextPage || !hasNextPage) return;

    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (lastPokemonElementRef.current) {
      observer.current.observe(lastPokemonElementRef.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [loadingType, isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Render loading skeletons
  if (loadingType.type === "pagination" && isPaginationLoading) {
    return (
      <section className="space-y-4">
        <section className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <SlEnergy className="text-yellow-400" size={32} />
            <h1 className="font-bold text-4xl">Pokédex</h1>
          </div>
          <p className="my-4">
            Discover and explore Pokémon with {loadingType.message}
          </p>
          <div className="space-x-4">
            {LoadingTypes?.map((type) => (
              <Button
                className={`capitalize ${
                  loadingType.type === type.type
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setLoadingType(type as LoadingType)}
                key={type.type}
                variant="outline"
              >
                {type.message}
              </Button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: POKEMONS_PER_PAGE }).map((_, index) => (
            <SkeletonPokemonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (loadingType.type === "infinite" && isInfiniteLoading && !infiniteData) {
    return (
      <section className="space-y-4">
        <section className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <SlEnergy className="text-yellow-400" size={32} />
            <h1 className="font-bold text-4xl">Pokédex</h1>
          </div>
          <p className="my-4">
            Discover and explore Pokémon with {loadingType.message}
          </p>
          <div className="space-x-4">
            {LoadingTypes?.map((type) => (
              <Button
                className={`capitalize ${
                  loadingType.type === type.type
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setLoadingType(type as LoadingType)}
                key={type.type}
                variant="outline"
              >
                {type.message}
              </Button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: POKEMONS_PER_PAGE }).map((_, index) => (
            <SkeletonPokemonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  // Flatten infinite scroll data
  const allPokemons =
    loadingType.type === "infinite"
      ? infiniteData?.pages.flat() || []
      : paginatedData || [];

  return (
    <section className="space-y-4">
      <section className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2">
          <SlEnergy className="text-yellow-400" size={32} />
          <h1 className="font-bold text-4xl">Pokédex</h1>
        </div>
        <p className="my-4">
          Discover and explore Pokémon with {loadingType.message}
        </p>
        <div className="space-x-4">
          {LoadingTypes?.map((type) => (
            <Button
              className={`capitalize ${
                loadingType.type === type.type
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => {
                setLoadingType(type as LoadingType);
                // Reset to first page when switching to pagination
                if (type.type === "pagination") {
                  setCurrentPage(1);
                }
              }}
              key={type.type}
              variant="outline"
            >
              {type.message}
            </Button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {allPokemons?.map((pokemon, index) => (
          <div
            ref={
              loadingType.type === "infinite" &&
              index === allPokemons.length - 1
                ? lastPokemonElementRef
                : null
            }
            key={pokemon.name}
          >
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      {/* Show loading indicator for infinite scroll */}
      {loadingType.type === "infinite" && isFetchingNextPage && (
        <div className="grid grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonPokemonCard key={index} />
          ))}
        </div>
      )}

      {/* Pagination controls for pagination mode */}
      {loadingType.type === "pagination" && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => prev + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default Homepage;
