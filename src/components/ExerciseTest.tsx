import { useState } from "react";
import {
  useExercisesByBodyPart,
  useBodyPartsList,
} from "@/services/exerciseService";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export function ExerciseTest() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");

  const { data: bodyParts, isLoading: isLoadingBodyParts } = useBodyPartsList();
  const { data: exercises, isLoading: isLoadingExercises } =
    useExercisesByBodyPart(selectedBodyPart);

  if (isLoadingBodyParts || isLoadingExercises) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Vücut Bölümü Seçin</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedBodyPart ? "default" : "outline"}
            onClick={() => setSelectedBodyPart("")}
          >
            Tümü
          </Button>
          {bodyParts?.map((part) => (
            <Button
              key={part}
              variant={selectedBodyPart === part ? "default" : "outline"}
              onClick={() => setSelectedBodyPart(part)}
            >
              {part}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exercises?.map((exercise) => (
          <div
            key={exercise.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {exercise.gifUrl && (
              <img
                src={exercise.gifUrl}
                alt={exercise.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
            )}
            <h2 className="text-lg font-semibold mb-2">{exercise.name}</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Hedef Bölge: {exercise.target}</p>
              <p>Vücut Bölümü: {exercise.bodyPart}</p>
              <p>Ekipman: {exercise.equipment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
