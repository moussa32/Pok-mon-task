import { SlEnergy } from "react-icons/sl";
import LoadingTypeButtons from "./LoadingTypeButtons";
import type { LoadingType } from "../types/LoadingTypes";

interface HeaderSectionProps {
  loadingType: LoadingType;
  onLoadingTypeChange: (type: LoadingType) => void;
}

const HeaderSection = ({
  loadingType,
  onLoadingTypeChange,
}: HeaderSectionProps) => {
  return (
    <section className="text-center mb-8">
      <div className="flex items-center justify-center space-x-2">
        <SlEnergy className="text-yellow-400" size={32} />
        <h1 className="font-bold text-4xl">Pokédex</h1>
      </div>
      <p className="my-4">
        Discover and explore Pokémon with {loadingType.message}
      </p>
      <LoadingTypeButtons
        loadingType={loadingType}
        onLoadingTypeChange={onLoadingTypeChange}
      />
    </section>
  );
};

export default HeaderSection;
