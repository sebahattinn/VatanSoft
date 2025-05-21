import { useState, useEffect } from "react";
import { useExerciseList } from "@/hooks/useExerciseList";
import { ExerciseCard } from "@/components/ExerciseCard";
import ExerciseDetail from "@/components/ExerciseDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ExerciseFilters } from "@/components/ExerciseFilters";
import { ExerciseSearchForm } from "@/components/ExerciseSearchForm";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import type { Exercise } from "@/types/exercise";

const ITEMS_PER_PAGE = 12;

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

  const hasActiveFilters =
    filters.bodyPart || filters.target || filters.equipment || searchTerm;

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

  useEffect(() => {
    if (!currentData || page === 0) return;

    setExercises((prev) => {
      const existingIds = new Set(prev.map((e) => e.id));
      const fresh = currentData.filter((e) => !existingIds.has(e.id));
      if (fresh.length === 0) return prev;
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Exercise Library
            </h1>
            <p className="text-lg text-gray-600">
              Discover professional exercises to build muscle and improve your
              form
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Filters */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle>Advanced Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Exercise Grid */}
          <div className="col-span-12 lg:col-span-9">
            {/* Results Info */}
            {exercises.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  Showing {exercises.length}{" "}
                  {exercises.length === 1 ? "result" : "results"}
                </p>
                <Button
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="text-sm"
                  disabled={!hasActiveFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Exercise Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              key={JSON.stringify(filters) + searchTerm}
            >
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onClick={() => setSelectedExerciseId(exercise.id)}
                />
              ))}

              {/* Loading Skeletons */}
              {isLoading &&
                [...Array(6)].map((_, i) => (
                  <Card key={`loading-${i}`} className="p-4 space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {/* No Results */}
            {exercises.length === 0 && !isLoading && (
              <Card className="p-12 text-center">
                <div className="max-w-sm mx-auto space-y-4">
                  <h3 className="text-lg font-medium">No Results Found</h3>
                  <p className="text-sm text-gray-600">
                    Try different keywords or clear your filters to see more
                    results.
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                </div>
              </Card>
            )}

            {/* Load More */}
            {hasMore && !isLoading && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="min-w-[200px]"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExerciseId && (
        <ExerciseDetail
          exerciseId={selectedExerciseId}
          onClose={() => setSelectedExerciseId("")}
        />
      )}
    </div>
  );
}
