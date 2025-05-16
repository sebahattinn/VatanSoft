import { useState, useEffect } from "react";
import {
  useExercises,
  useExercisesByBodyPart,
  useExercisesByName,
} from "@/services/exerciseService";
import { ExerciseCard } from "./ExerciseCard";
import ExerciseDetail from "./ExerciseDetail";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { ExerciseFilters } from "./ExerciseFilters";
import { ExerciseSearchForm } from "./ExerciseSearchForm";
import type { Exercise } from "@/types/exercise";

const ITEMS_PER_PAGE = 9;

export function ExerciseList() {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Seçilen filtreler
  const [filters, setFilters] = useState<{
    bodyPart: string;
    target: string;
    equipment: string;
  }>({
    bodyPart: "",
    target: "",
    equipment: "",
  });

  // Pagination parametreleri
  const paginationParams = {
    offset: page * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
  };

  // API sorguları
  const { data: newExercises, isLoading: allLoading } =
    useExercises(paginationParams);
  const { data: searchResults, isLoading: searchLoading } = useExercisesByName(
    searchTerm,
    searchTerm ? paginationParams : undefined
  );
  const { data: filteredByBody, isLoading: loadingBody } =
    useExercisesByBodyPart(
      filters.bodyPart,
      filters.bodyPart ? paginationParams : undefined
    );

  // Yükleme durumu
  const isLoading = allLoading || searchLoading || loadingBody;

  // Filtre veya arama değiştiğinde mevcut egzersizleri sıfırla
  useEffect(() => {
    setExercises([]);
    setPage(0);
  }, [searchTerm, filters.bodyPart, filters.target, filters.equipment]);

  // Yeni veri geldiğinde egzersizleri güncelle
  useEffect(() => {
    const currentData = searchTerm
      ? searchResults
      : filters.bodyPart
      ? filteredByBody
      : newExercises;

    if (currentData) {
      if (page === 0) {
        setExercises(currentData);
      } else {
        setExercises((prev) => {
          const newExercisesIds = new Set(currentData.map((ex) => ex.id));
          const existingExercises = prev.filter(
            (ex) => !newExercisesIds.has(ex.id)
          );
          return [...existingExercises, ...currentData];
        });
      }
    }
  }, [
    newExercises,
    searchResults,
    filteredByBody,
    page,
    searchTerm,
    filters.bodyPart,
  ]);

  // Filtreleme mantığı
  const getFilteredExercises = (): Exercise[] => {
    let result = exercises;

    if (filters.target) {
      result = result.filter((e) => e.target === filters.target);
    }
    if (filters.equipment) {
      result = result.filter((e) => e.equipment === filters.equipment);
    }

    return result;
  };

  const filteredExercises = getFilteredExercises();
  const hasMore =
    (newExercises?.length ?? 0) === ITEMS_PER_PAGE ||
    (searchResults?.length ?? 0) === ITEMS_PER_PAGE ||
    (filteredByBody?.length ?? 0) === ITEMS_PER_PAGE;

  const handleClearFilters = () => {
    setFilters({ bodyPart: "", target: "", equipment: "" });
    setSearchTerm("");
    setSelectedExerciseId("");
    setExercises([]);
    setPage(0);
  };

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Egzersiz Listesi</h1>

      {/* Arama Formu */}
      <ExerciseSearchForm onSearch={setSearchTerm} />

      {/* Filtre Bileşeni */}
      <ExerciseFilters
        selected={filters}
        onSelect={{
          setBodyPart: (bodyPart) => setFilters((f) => ({ ...f, bodyPart })),
          setTarget: (target) => setFilters((f) => ({ ...f, target })),
          setEquipment: (equipment) => setFilters((f) => ({ ...f, equipment })),
        }}
        onClear={handleClearFilters}
      />

      {/* Egzersiz Grid'i */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => setSelectedExerciseId(exercise.id)}
          />
        ))}
        {isLoading && (
          <>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={`loading-${i}`} className="h-48 w-full" />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !isLoading && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore} variant="outline" size="lg">
            Daha Fazla Yükle
          </Button>
        </div>
      )}

      {/* Seçilen Egzersiz Detay Modalı */}
      {selectedExerciseId && (
        <ExerciseDetail
          exerciseId={selectedExerciseId}
          onClose={() => setSelectedExerciseId("")}
        />
      )}
    </div>
  );
}
