import {
  useBodyPartList,
  useEquipmentList,
  useTargetList,
} from "@/services/exerciseService";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getFavorites } from "@/utils/favorites";
import { useEffect, useState } from "react";

interface SelectedFilters {
  bodyPart: string;
  target: string;
  equipment: string;
  favorite: boolean;
}

interface OnSelectHandlers {
  setBodyPart: (value: string) => void;
  setTarget: (value: string) => void;
  setEquipment: (value: string) => void;
  setFavorite: (value: boolean) => void;
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
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    // Favori sayısını güncelle
    const favorites = getFavorites();
    setFavoriteCount(favorites.length);
  }, []);

  const hasActiveFilters =
    selected.bodyPart ||
    selected.target ||
    selected.equipment ||
    selected.favorite;

  // Helper function to format text
  const formatText = (text: string) => {
    return text
      .split(/[\s-]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Handlers
  const handleBodyPartSelect = (value: string) => {
    onSelect.setTarget("");
    onSelect.setEquipment("");
    onSelect.setFavorite(false);
    onSelect.setBodyPart(value);
  };

  const handleTargetSelect = (value: string) => {
    onSelect.setBodyPart("");
    onSelect.setEquipment("");
    onSelect.setFavorite(false);
    onSelect.setTarget(value);
  };

  const handleEquipmentSelect = (value: string) => {
    onSelect.setBodyPart("");
    onSelect.setTarget("");
    onSelect.setFavorite(false);
    onSelect.setEquipment(value);
  };

  const handleFavoriteSelect = (value: boolean) => {
    onSelect.setBodyPart("");
    onSelect.setTarget("");
    onSelect.setEquipment("");
    onSelect.setFavorite(value);
  };

  useEffect(() => {
    const updateFavorites = () => {
      const favorites = getFavorites();
      setFavoriteCount(favorites.length);
    };

    updateFavorites();

    window.addEventListener("favoritesUpdated", updateFavorites);
    return () => {
      window.removeEventListener("favoritesUpdated", updateFavorites);
    };
  }, []);

  return (
    <Card className="w-full p-4 bg-white shadow-lg">
      <div className="space-y-4">
        {/* Active Filters Area */}
        <div className={`relative w-full ${hasActiveFilters ? "mb-16" : ""}`}>
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b absolute inset-x-0">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-700 border-gray-200 shrink-0"
                >
                  Active Filter
                </Badge>
                {selected.bodyPart && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-100 transition-colors group bg-gray-50 text-gray-700 shrink-0"
                    onClick={() => handleBodyPartSelect("")}
                  >
                    <span className="mr-1">💪</span>
                    <span className="truncate">
                      {formatText(selected.bodyPart)}
                    </span>
                    <span className="ml-1 opacity-60 group-hover:opacity-100">
                      ×
                    </span>
                  </Badge>
                )}
                {selected.target && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-100 transition-colors group bg-gray-50 text-gray-700 shrink-0"
                    onClick={() => handleTargetSelect("")}
                  >
                    <span className="mr-1">🎯</span>
                    <span className="truncate">
                      {formatText(selected.target)}
                    </span>
                    <span className="ml-1 opacity-60 group-hover:opacity-100">
                      ×
                    </span>
                  </Badge>
                )}
                {selected.equipment && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-100 transition-colors group bg-gray-50 text-gray-700 shrink-0"
                    onClick={() => handleEquipmentSelect("")}
                  >
                    <span className="mr-1">🧰</span>
                    <span className="truncate">
                      {formatText(selected.equipment)}
                    </span>
                    <span className="ml-1 opacity-60 group-hover:opacity-100">
                      ×
                    </span>
                  </Badge>
                )}
                {selected.favorite && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-100 transition-colors group bg-gray-50 text-gray-700 shrink-0"
                    onClick={() => handleFavoriteSelect(false)}
                  >
                    <span className="mr-1">⭐</span>
                    <span className="truncate">Favorites</span>
                    <span className="ml-1 opacity-60 group-hover:opacity-100">
                      ×
                    </span>
                  </Badge>
                )}
              </div>
              <Button
                onClick={onClear}
                variant="default"
                size="sm"
                className=" shrink-0"
              >
                Clear Filter
              </Button>
            </div>
          )}
        </div>

        {/* Filter Groups */}
        <Accordion type="single" collapsible className="w-full">
          {/* Favorites */}
          <AccordionItem value="favorites" className="border-gray-200">
            <AccordionTrigger className="hover:no-underline hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span className="text-gray-900">Favorites</span>
                {favoriteCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-gray-100 text-gray-700"
                  >
                    {favoriteCount}
                  </Badge>
                )}
                {selected.favorite && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-gray-100 text-gray-700"
                  >
                    Active
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 flex flex-col gap-4">
                <p className="text-gray-600 text-sm">
                  {favoriteCount > 0
                    ? `You have ${favoriteCount} favorite exercises.`
                    : "You don't have any favorite exercises yet."}
                </p>
                <Button
                  onClick={() => handleFavoriteSelect(!selected.favorite)}
                  variant={selected.favorite ? "outline" : "default"}
                  className="w-full"
                >
                  {selected.favorite ? "Hide Favorites" : "Show Only Favorites"}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Body Parts */}
          <AccordionItem value="body-parts" className="border-gray-200">
            <AccordionTrigger className="hover:no-underline hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-lg">💪</span>
                <span className="text-gray-900">Body Parts</span>
                {selected.bodyPart && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-gray-100 text-gray-700"
                  >
                    {formatText(selected.bodyPart)}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Command className="rounded-lg border border-gray-200 bg-white">
                <CommandInput
                  placeholder="Search body parts..."
                  className="text-gray-900"
                />
                <CommandList>
                  <CommandEmpty className="text-gray-500">
                    No results found
                  </CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[200px]">
                      {bodyParts.map((part) => (
                        <CommandItem
                          key={part}
                          value={part}
                          onSelect={() => handleBodyPartSelect(part)}
                          className="cursor-pointer text-gray-700 hover:bg-gray-50"
                        >
                          {formatText(part)}
                          {selected.bodyPart === part && (
                            <Badge
                              variant="secondary"
                              className="ml-auto bg-gray-100"
                            >
                              Selected
                            </Badge>
                          )}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </AccordionContent>
          </AccordionItem>

          {/* Target Muscles */}
          <AccordionItem value="targets" className="border-gray-200">
            <AccordionTrigger className="hover:no-underline hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <span className="text-gray-900">Target Muscles</span>
                {selected.target && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-gray-100 text-gray-700"
                  >
                    {formatText(selected.target)}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Command className="rounded-lg border border-gray-200 bg-white">
                <CommandInput
                  placeholder="Search target muscles..."
                  className="text-gray-900"
                />
                <CommandList>
                  <CommandEmpty className="text-gray-500">
                    No results found
                  </CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[200px]">
                      {targets.map((target) => (
                        <CommandItem
                          key={target}
                          value={target}
                          onSelect={() => handleTargetSelect(target)}
                          className="cursor-pointer text-gray-700 hover:bg-gray-50"
                        >
                          {formatText(target)}
                          {selected.target === target && (
                            <Badge
                              variant="secondary"
                              className="ml-auto bg-gray-100"
                            >
                              Selected
                            </Badge>
                          )}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </AccordionContent>
          </AccordionItem>

          {/* Equipment */}
          <AccordionItem value="equipment" className="border-gray-200">
            <AccordionTrigger className="hover:no-underline hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧰</span>
                <span className="text-gray-900">Equipment</span>
                {selected.equipment && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-gray-100 text-gray-700"
                  >
                    {formatText(selected.equipment)}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Command className="rounded-lg border border-gray-200 bg-white">
                <CommandInput
                  placeholder="Search equipment..."
                  className="text-gray-900"
                />
                <CommandList>
                  <CommandEmpty className="text-gray-500">
                    No results found
                  </CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[200px]">
                      {equipment.map((eq) => (
                        <CommandItem
                          key={eq}
                          value={eq}
                          onSelect={() => handleEquipmentSelect(eq)}
                          className="cursor-pointer text-gray-700 hover:bg-gray-50"
                        >
                          {formatText(eq)}
                          {selected.equipment === eq && (
                            <Badge
                              variant="secondary"
                              className="ml-auto bg-gray-100"
                            >
                              Selected
                            </Badge>
                          )}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
}
