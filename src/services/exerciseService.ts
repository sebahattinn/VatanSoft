import { useQueryWithData } from "@/hooks/use-query";
import type {
  Exercise,
  BodyPartList,
  EquipmentList,
  TargetList,
} from "@/types/exercise";

// Query Keys
export const exerciseKeys = {
  all: ["exercises"],
  lists: () => [...exerciseKeys.all, "lists"],
  list: (filters: Record<string, unknown>) => [
    ...exerciseKeys.all,
    JSON.stringify(filters),
  ],
  bodyParts: () => [...exerciseKeys.all, "lists", "bodyParts"],
  equipment: () => [...exerciseKeys.all, "lists", "equipment"],
  targets: () => [...exerciseKeys.all, "lists", "targets"],
  detail: (id: string) => [...exerciseKeys.all, "detail", id],
};

// Tüm egzersizleri getir
export function useExercises() {
  return useQueryWithData<Exercise[]>(exerciseKeys.all, "/exercises", true);
}

// Vücut bölgesine göre egzersizleri getir
export function useExercisesByBodyPart(bodyPart: string) {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.list({ bodyPart }),
    `/exercises/bodyPart/${bodyPart}`,
    !!bodyPart
  );
}

// Ekipman tipine göre egzersizleri getir
export function useExercisesByEquipment(equipment: string) {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.list({ equipment }),
    `/exercises/equipment/${equipment}`,
    !!equipment
  );
}

// Hedef kasa göre egzersizleri getir
export function useExercisesByTarget(target: string) {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.list({ target }),
    `/exercises/target/${target}`,
    !!target
  );
}

// Egzersiz detayını getir
export function useExerciseDetail(id: string) {
  return useQueryWithData<Exercise>(
    exerciseKeys.detail(id),
    `/exercises/exercise/${id}`,
    !!id
  );
}

// İsme göre egzersiz ara
export function useExerciseByName(name: string) {
  return useQueryWithData<Exercise>(
    exerciseKeys.list({ name }),
    `/exercises/name/${name}`,
    !!name
  );
}

// Vücut bölümlerinin listesini getir
export function useBodyPartsList() {
  return useQueryWithData<BodyPartList>(
    exerciseKeys.bodyParts(),
    "/exercises/bodyPartList",
    true,
    undefined,
    {
      staleTime: Infinity,
      gcTime: Infinity,
    }
  );
}

// Ekipman listesini getir
export function useEquipmentList() {
  return useQueryWithData<EquipmentList>(
    exerciseKeys.equipment(),
    "/exercises/equipmentList",
    true,
    undefined,
    {
      staleTime: Infinity,
      gcTime: Infinity,
    }
  );
}

// Hedef kas grupları listesini getir
export function useTargetList() {
  return useQueryWithData<TargetList>(
    exerciseKeys.targets(),
    "/exercises/targetList",
    true,
    undefined,
    {
      staleTime: Infinity,
      gcTime: Infinity,
    }
  );
}
