import SkeletonPokemonCard from "./SkeletonPokemonCard";

interface LoadingSkeletonsProps {
  count: number;
}

const LoadingSkeletons = ({ count }: LoadingSkeletonsProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonPokemonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeletons;
