import type {
  Exercise,
  BodyPartList,
  EquipmentList,
  TargetList,
} from "@/types/exercise";
import { useQueryWithData, type ApiParams } from "@/hooks/use-query";
import { exerciseKeys } from "@/utils/queryKeys";

// Tüm egzersizleri getir
export const useExercises = (params?: Pick<ApiParams, "limit" | "offset">) => {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.list(params),
    "/exercises",
    true,
    params
  );
};

// Egzersiz detayını getir
export const useExerciseDetail = (id: string) => {
  return useQueryWithData<Exercise>(
    exerciseKeys.detail(id),
    `/exercises/exercise/${id}`,
    Boolean(id)
  );
};

// Vücut bölümüne göre egzersizleri getir
export const useExercisesByBodyPart = (
  bodyPart: string,
  params?: Pick<ApiParams, "limit" | "offset">
) => {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.byBodyPart(bodyPart, params),
    `/exercises/bodyPart/${bodyPart}`,
    Boolean(bodyPart),
    params
  );
};

// Ekipmana göre egzersizleri getir
export const useExercisesByEquipment = (
  equipment: string,
  params?: Pick<ApiParams, "limit" | "offset">
) => {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.byEquipment(equipment, params),
    `/exercises/equipment/${equipment}`,
    Boolean(equipment),
    params
  );
};

// Hedef kasa göre egzersizleri getir
export const useExercisesByTarget = (
  target: string,
  params?: Pick<ApiParams, "limit" | "offset">
) => {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.byTarget(target, params),
    `/exercises/target/${target}`,
    Boolean(target),
    params
  );
};

// Egzersiz adına göre arama
export const useExercisesByName = (
  name: string,
  params?: Pick<ApiParams, "limit" | "offset">
) => {
  return useQueryWithData<Exercise[]>(
    exerciseKeys.byName(name, params),
    `/exercises/name/${name}`,
    Boolean(name),
    params
  );
};

// Vücut bölümleri listesini getir
export const useBodyPartList = () => {
  return useQueryWithData<BodyPartList>(
    exerciseKeys.bodyParts(),
    "/exercises/bodyPartList"
  );
};

// Ekipman listesini getir
export const useEquipmentList = () => {
  return useQueryWithData<EquipmentList>(
    exerciseKeys.equipment(),
    "/exercises/equipmentList"
  );
};

// Hedef kas listesi
export const useTargetList = () => {
  return useQueryWithData<TargetList>(
    exerciseKeys.targets(),
    "/exercises/targetList"
  );
};
