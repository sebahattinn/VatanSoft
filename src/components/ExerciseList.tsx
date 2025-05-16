import { useState } from "react";
import {
  useExercises,
  useBodyPartsList,
  useExercisesByBodyPart,
  useExerciseDetail,
} from "@/services/exerciseService";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function ExerciseList() {
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  // Tüm egzersizleri ve vücut bölümlerini çek
  const { data: exercises, isLoading: exercisesLoading } = useExercises();
  const { data: bodyParts, isLoading: bodyPartsLoading } = useBodyPartsList();
  const { data: filteredExercises, isLoading: filterLoading } =
    useExercisesByBodyPart(selectedBodyPart);
  const { data: selectedExercise, isLoading: detailLoading } =
    useExerciseDetail(selectedExerciseId);

  // Yükleniyor durumu
  if (exercisesLoading || bodyPartsLoading) {
    return (
      <div className="p-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const displayExercises = selectedBodyPart ? filteredExercises : exercises;

  return (
    <div className="p-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold">Egzersiz Listesi</h1>

        {/* Vücut Bölümü Filtreleme */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={!selectedBodyPart ? "default" : "outline"}
            onClick={() => {
              setSelectedBodyPart("");
              setSelectedExerciseId("");
            }}
          >
            Tümü
          </Button>
          {bodyParts?.map((part) => (
            <Button
              key={part}
              variant={selectedBodyPart === part ? "default" : "outline"}
              onClick={() => {
                setSelectedBodyPart(part);
                setSelectedExerciseId("");
              }}
            >
              {part}
            </Button>
          ))}
        </div>
      </div>

      {/* Egzersiz Listesi */}
      {filterLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayExercises?.map((exercise) => (
            <div
              key={exercise.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedExerciseId(exercise.id)}
            >
              <img
                src={exercise.gifUrl}
                alt={exercise.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{exercise.name}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Bölge: {exercise.bodyPart}</p>
                <p>Hedef: {exercise.target}</p>
                <p>Ekipman: {exercise.equipment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Seçili Egzersiz Detayı */}
      {selectedExerciseId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {detailLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">
                    {selectedExercise?.name}
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedExerciseId("")}
                  >
                    ✕
                  </Button>
                </div>
                <img
                  src={selectedExercise?.gifUrl}
                  alt={selectedExercise?.name}
                  className="w-full max-h-96 object-contain mb-6 rounded-lg"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Talimatlar:</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedExercise?.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Bölge</p>
                      <p className="text-muted-foreground">
                        {selectedExercise?.bodyPart}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Hedef</p>
                      <p className="text-muted-foreground">
                        {selectedExercise?.target}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Ekipman</p>
                      <p className="text-muted-foreground">
                        {selectedExercise?.equipment}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
