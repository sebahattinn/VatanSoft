import {
  useBodyPartList,
  useEquipmentList,
  useTargetList,
} from "@/services/exerciseService";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

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

  const hasActiveFilters =
    selected.bodyPart || selected.target || selected.equipment;

  return (
    <div className="w-full space-y-4">
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Aktif Filtreler
          </Badge>
          {selected.bodyPart && (
            <Badge
              variant="secondary"
              className="cursor-pointer text-black"
              onClick={() => onSelect.setBodyPart("")}
            >
              {selected.bodyPart} ×
            </Badge>
          )}
          {selected.target && (
            <Badge
              variant="secondary"
              className="cursor-pointer text-black"
              onClick={() => onSelect.setTarget("")}
            >
              🎯 {selected.target} ×
            </Badge>
          )}
          {selected.equipment && (
            <Badge
              variant="secondary"
              className="cursor-pointer text-black"
              onClick={() => onSelect.setEquipment("")}
            >
              🧰 {selected.equipment} ×
            </Badge>
          )}
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            className="ml-auto"
          >
            Tümünü Temizle
          </Button>
        </div>
      )}

      <Tabs defaultValue="bodyParts" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger className="text-white" value="bodyParts">
            Vücut Bölgeleri
          </TabsTrigger>
          <TabsTrigger className="text-white" value="targets">
            Hedef Kaslar
          </TabsTrigger>
          <TabsTrigger className="text-white" value="equipment">
            Ekipmanlar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bodyParts">
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="flex flex-wrap gap-2">
              {bodyParts.map((part) => (
                <Button
                  key={part}
                  onClick={() => onSelect.setBodyPart(part)}
                  variant={selected.bodyPart === part ? "secondary" : "outline"}
                  size="sm"
                  className="text-white"
                >
                  {part}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="targets">
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="flex flex-wrap gap-2">
              {targets.map((target) => (
                <Button
                  key={target}
                  onClick={() => onSelect.setTarget(target)}
                  variant={selected.target === target ? "secondary" : "outline"}
                  size="sm"
                  className="text-white"
                >
                  🎯 {target}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="equipment">
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="flex flex-wrap gap-2">
              {equipment.map((eq) => (
                <Button
                  key={eq}
                  onClick={() => onSelect.setEquipment(eq)}
                  variant={selected.equipment === eq ? "secondary" : "outline"}
                  size="sm"
                  className="text-white"
                >
                  🧰 {eq}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
