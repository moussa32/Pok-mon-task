import SkeletonPokemonCard from "./SkeletonPokemonCard";

interface InfiniteScrollLoaderProps {
  isVisible: boolean;
}

const InfiniteScrollLoader = ({ isVisible }: InfiniteScrollLoaderProps) => {
  if (!isVisible) return null;

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonPokemonCard key={index} />
      ))}
    </div>
  );
};

export default InfiniteScrollLoader;
