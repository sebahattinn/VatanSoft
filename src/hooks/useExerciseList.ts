import {
  useExercises,
  useExercisesByBodyPart,
  useExercisesByTarget,
  useExercisesByEquipment,
  useExercisesByName,
} from "@/services/exerciseService";
import type { Exercise } from "@/types/exercise";

interface Filters {
  bodyPart: string;
  target: string;
  equipment: string;
}

interface Pagination {
  offset: number;
  limit: number;
}

export function useExerciseList(
  filters: Filters,
  pagination: Pagination,
  searchTerm?: string
) {
  // Hook'lar her zaman çağrılıyor
  const { data: all, isLoading: loadingAll } = useExercises(pagination);
  const { data: byBody, isLoading: loadingBody } = useExercisesByBodyPart(
    filters.bodyPart,
    pagination
  );
  const { data: byTarget, isLoading: loadingTarget } = useExercisesByTarget(
    filters.target,
    pagination
  );
  const { data: byEquip, isLoading: loadingEquip } = useExercisesByEquipment(
    filters.equipment,
    pagination
  );
  const { data: byName, isLoading: loadingName } = useExercisesByName(
    searchTerm ?? "",
    searchTerm ? pagination : undefined
  );

  if (searchTerm) {
    return {
      exercises: byName ?? [],
      isLoading: loadingName,
    };
  }

  const isOnlyBody =
    !!filters.bodyPart && !filters.target && !filters.equipment;
  const isOnlyTarget =
    !!filters.target && !filters.bodyPart && !filters.equipment;
  const isOnlyEquip =
    !!filters.equipment && !filters.bodyPart && !filters.target;

  const shouldFrontendFilter =
    [filters.bodyPart, filters.target, filters.equipment].filter(Boolean)
      .length > 1;

  let data: Exercise[] | undefined;
  let isLoading = false;

  if (shouldFrontendFilter) {
    if (filters.bodyPart) data = byBody;
    else if (filters.target) data = byTarget;
    else if (filters.equipment) data = byEquip;
    else data = all;

    isLoading = loadingBody || loadingTarget || loadingEquip || loadingAll;

    data = data?.filter((ex) => {
      const matchTarget = filters.target ? ex.target === filters.target : true;
      const matchEquip = filters.equipment
        ? ex.equipment === filters.equipment
        : true;
      const matchBody = filters.bodyPart
        ? ex.bodyPart === filters.bodyPart
        : true;
      return matchBody && matchTarget && matchEquip;
    });
  } else {
    if (isOnlyBody) {
      data = byBody;
      isLoading = loadingBody;
    } else if (isOnlyTarget) {
      data = byTarget;
      isLoading = loadingTarget;
    } else if (isOnlyEquip) {
      data = byEquip;
      isLoading = loadingEquip;
    } else {
      data = all;
      isLoading = loadingAll;
    }
  }

  return { exercises: data ?? [], isLoading };
}
