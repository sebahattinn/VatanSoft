import {
  useBodyPartList,
  useEquipmentList,
  useTargetList,
} from "@/services/exerciseService";
import { Button } from "./ui/button";

interface SelectedFilters {
  bodyPart: string;
  target: string;
  equipment: string;
}

interface OnSelectHandlers {
  setBodyPart: (value: string) => void;
  setTarget: (value: string) => void;
  setEquipment: (value: string) => void;
}

interface ExerciseFiltersProps {
  selected: SelectedFilters;
  onSelect: OnSelectHandlers;
  onClear: () => void;
}

export function ExerciseFilters({
  selected,
  onSelect,
  onClear,
}: ExerciseFiltersProps) {
  const { data: bodyParts = [] } = useBodyPartList();
  const { data: targets = [] } = useTargetList();
  const { data: equipment = [] } = useEquipmentList();

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button onClick={onClear} variant="default">
        Filtreleri Temizle
      </Button>

      {bodyParts.map((part) => (
        <Button
          key={part}
          onClick={() => onSelect.setBodyPart(part)}
          variant={selected.bodyPart === part ? "outline" : "default"}
        >
          {part}
        </Button>
      ))}

      {targets.map((target) => (
        <Button
          key={target}
          onClick={() => onSelect.setTarget(target)}
          variant={selected.target === target ? "outline" : "default"}
        >
          🎯 {target}
        </Button>
      ))}

      {equipment.map((eq) => (
        <Button
          key={eq}
          onClick={() => onSelect.setEquipment(eq)}
          variant={selected.equipment === eq ? "outline" : "default"}
        >
          🧰 {eq}
        </Button>
      ))}
    </div>
  );
}
