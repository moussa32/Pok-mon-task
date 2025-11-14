import { Button } from "@/components/ui/button";
import type { LoadingType } from "../types/LoadingTypes";

const LoadingTypes = [
  {
    type: "pagination",
    message: "page controls",
  },
  { type: "infinite", message: "infinite scroll" },
];

interface LoadingTypeButtonsProps {
  loadingType: LoadingType;
  onLoadingTypeChange: (type: LoadingType) => void;
}

const LoadingTypeButtons = ({
  loadingType,
  onLoadingTypeChange,
}: LoadingTypeButtonsProps) => {
  return (
    <div className="space-x-4">
      {LoadingTypes.map((type) => (
        <Button
          className={`capitalize ${
            loadingType.type === type.type
              ? "bg-primary text-primary-foreground hover:text-white hover:bg-primary/90"
              : ""
          }`}
          onClick={() => onLoadingTypeChange(type as LoadingType)}
          key={type.type}
          variant="outline"
        >
          {type.message}
        </Button>
      ))}
    </div>
  );
};

export default LoadingTypeButtons;
