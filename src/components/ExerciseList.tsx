import { useState, useEffect } from "react";
import { useExerciseList } from "@/hooks/useExerciseList";
import { ExerciseCard } from "./ExerciseCard";
import ExerciseDetail from "./ExerciseDetail";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { ExerciseFilters } from "./ExerciseFilters";
import { ExerciseSearchForm } from "./ExerciseSearchForm";
import { Card } from "./ui/card";
import type { Exercise } from "@/types/exercise";

const ITEMS_PER_PAGE = 9;

export function ExerciseList() {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [filters, setFilters] = useState({
    bodyPart: "",
    target: "",
    equipment: "",
  });

  const paginationParams = {
    offset: page * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
  };

  const { exercises: currentData, isLoading } = useExerciseList(
    filters,
    paginationParams,
    searchTerm
  );

  useEffect(() => {
    setPage(0);
  }, [filters.bodyPart, filters.target, filters.equipment, searchTerm]);

  // Sayfa = 0 → doğrudan güncelle
  useEffect(() => {
    if (!currentData) return;

    if (page === 0) {
      const currentIds = JSON.stringify(currentData.map((e) => e.id));
      const prevIds = JSON.stringify(exercises.map((e) => e.id));
      if (currentIds !== prevIds) {
        setExercises(currentData);
      }
    }
  }, [currentData, exercises, page]);

  // Sayfa > 0 → yeni veri varsa birleştir
  useEffect(() => {
    if (!currentData || page === 0) return;

    setExercises((prev) => {
      const existingIds = new Set(prev.map((e) => e.id));
      const fresh = currentData.filter((e) => !existingIds.has(e.id));
      if (fresh.length === 0) return prev; // döngüyü engelle
      return [...prev, ...fresh];
    });
  }, [currentData, page]);

  const hasMore = (currentData?.length ?? 0) === ITEMS_PER_PAGE;

  const handleClearFilters = () => {
    setFilters({ bodyPart: "", target: "", equipment: "" });
    setSearchTerm("");
    setSelectedExerciseId("");
    setPage(0);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col items-center text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Egzersiz Listesi</h1>
        <p className="text-muted-foreground">
          Yüzlerce egzersiz arasından size uygun olanı bulun
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <ExerciseSearchForm onSearch={setSearchTerm} />
          <ExerciseFilters
            selected={filters}
            onSelect={{
              setBodyPart: (bodyPart) =>
                setFilters({ bodyPart, target: "", equipment: "" }),
              setTarget: (target) =>
                setFilters({ bodyPart: "", target, equipment: "" }),
              setEquipment: (equipment) =>
                setFilters({ bodyPart: "", target: "", equipment }),
            }}
            onClear={handleClearFilters}
          />
        </div>
      </Card>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        key={JSON.stringify(filters) + searchTerm}
      >
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => setSelectedExerciseId(exercise.id)}
          />
        ))}
        {isLoading &&
          [...Array(3)].map((_, i) => (
            <Card key={`loading-${i}`} className="p-4 space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
      </div>

      {exercises.length === 0 && !isLoading && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Sonuç bulunamadı.</p>
          <Button onClick={handleClearFilters} variant="link" className="mt-2">
            Filtreleri temizle
          </Button>
        </Card>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            Daha Fazla Yükle
          </Button>
        </div>
      )}

      {selectedExerciseId && (
        <ExerciseDetail
          exerciseId={selectedExerciseId}
          onClose={() => setSelectedExerciseId("")}
        />
      )}
    </div>
  );
}
