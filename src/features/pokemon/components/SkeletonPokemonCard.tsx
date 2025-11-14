import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPokemonCard = () => {
  return (
    <div className="bg-white p-6 rounded flex flex-col space-y-3 shadow">
      <Skeleton className="h-[225px] bg-gray-400/30 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 bg-gray-400/30 rounded w-[250px]" />
        <Skeleton className="h-4 bg-gray-400/30 rounded w-[160px]" />
      </div>
    </div>
  );
};

export default SkeletonPokemonCard;
