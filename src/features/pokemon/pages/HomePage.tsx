import { usePokemons, useInfinitePokemons } from "../hooks/usePokemons";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { POKEMONS_PER_PAGE } from "../constants";
import type { LoadingType } from "../types/LoadingTypes";
import { useState, useEffect } from "react";
import HeaderSection from "../components/HeaderSection";
import PokemonGrid from "../components/PokemonGrid";
import InfiniteScrollLoader from "../components/InfiniteScrollLoader";
import PaginationControls from "../components/PaginationControls";
import LoadingSkeletons from "../components/LoadingSkeletons";

const Homepage = () => {
  const [loadingType, setLoadingType] = useState<LoadingType>({
    type: "pagination",
    message: "page controls",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

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

  // Set initial load to false when data is first loaded
  useEffect(() => {
    if (paginatedData && initialLoad) {
      setInitialLoad(false);
    }
  }, [paginatedData, initialLoad]);

  // Use the custom infinite scroll hook
  const { lastElementRef: lastPokemonElementRef } = useInfiniteScroll({
    loadingType: loadingType.type,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  // Render loading skeletons only during initial load
  if (loadingType.type === "pagination" && isPaginationLoading && initialLoad) {
    return (
      <section className="space-y-4">
        <HeaderSection
          loadingType={loadingType}
          onLoadingTypeChange={(type) => {
            setLoadingType(type);
            // Reset to first page when switching to pagination
            if (type.type === "pagination") {
              setCurrentPage(1);
              setInitialLoad(true);
            }
          }}
        />
        <LoadingSkeletons count={POKEMONS_PER_PAGE} />
      </section>
    );
  }

  if (loadingType.type === "infinite" && isInfiniteLoading && !infiniteData) {
    return (
      <section className="space-y-4">
        <HeaderSection
          loadingType={loadingType}
          onLoadingTypeChange={(type) => {
            setLoadingType(type);
            // Reset to first page when switching to pagination
            if (type.type === "pagination") {
              setCurrentPage(1);
              setInitialLoad(true);
            }
          }}
        />
        <LoadingSkeletons count={POKEMONS_PER_PAGE} />
      </section>
    );
  }

  // Flatten infinite scroll data
  const allPokemons =
    loadingType.type === "infinite"
      ? infiniteData?.pages.flat() || []
      : paginatedData?.pokemons || [];

  // Reset initialLoad when switching loading types
  const handleLoadingTypeChange = (type: LoadingType) => {
    setLoadingType(type);
    // Reset to first page when switching to pagination
    if (type.type === "pagination") {
      setCurrentPage(1);
      setInitialLoad(true);
    }
  };

  return (
    <section className="space-y-4">
      <HeaderSection
        loadingType={loadingType}
        onLoadingTypeChange={handleLoadingTypeChange}
      />

      <PokemonGrid
        pokemons={allPokemons}
        loadingType={loadingType.type}
        lastPokemonElementRef={lastPokemonElementRef}
      />

      <InfiniteScrollLoader
        isVisible={loadingType.type === "infinite" && isFetchingNextPage}
      />

      {/* Pagination controls for pagination mode */}
      {loadingType.type === "pagination" && paginatedData && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={paginatedData.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default Homepage;
