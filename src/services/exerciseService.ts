import type {
  Exercise,
  BodyPartList,
  EquipmentList,
  TargetList,
} from "@/types/exercise";
import { useQueryWithData } from "@/hooks/use-query";

export const exerciseKeys = {
  all: ["exercises"],
  lists: () => [...exerciseKeys.all, "lists"],
  list: (filters: Record<string, string>) => [
    ...exerciseKeys.all,
    { ...filters },
  ],
  detail: (id: string) => [...exerciseKeys.all, "detail", id],
  bodyParts: () => [...exerciseKeys.all, "bodyParts"],
  byBodyPart: (bodyPart: string) => [
    ...exerciseKeys.all,
    "byBodyPart",
    bodyPart,
  ],
  equipment: () => [...exerciseKeys.all, "equipment"],
  targets: () => [...exerciseKeys.all, "targets"],
};

// Tüm egzersizleri getir
export const useExercises = () => {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.all as string[],
    "/exercises"
  );
};

// Vücut bölümüne göre egzersizleri getir
export const useExercisesByBodyPart = (bodyPart: string) => {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.byBodyPart(bodyPart) as string[],
    `/exercises/bodyPart/${bodyPart}`,
    !!bodyPart // bodyPart varsa sorguyu etkinleştir
  );
};

// Egzersiz detayını getir
export const useExerciseDetail = (id: string) => {
  return useQueryWithData<Exercise>(
    exerciseKeys.detail(id) as string[],
    `/exercises/exercise/${id}`,
    !!id // id varsa sorguyu etkinleştir
  );
};

// Vücut bölümleri listesini getir (renamed from useBodyParts to match component usage)
export const useBodyPartsList = () => {
  return useQueryWithData<BodyPartList>(
    exerciseKeys.bodyParts() as string[],
    "/exercises/bodyPartList"
  );
};

// Ekipman listesini getir
export const useEquipment = () => {
  return useQueryWithData<EquipmentList>(
    exerciseKeys.equipment() as string[],
    "/exercises/equipmentList"
  );
};

// Hedef bölgeleri getir
export const useTargets = () => {
  return useQueryWithData<TargetList>(
    exerciseKeys.targets() as string[],
    "/exercises/targetList"
  );
};
