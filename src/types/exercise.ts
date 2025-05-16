export interface Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export type BodyPartList = string[];
export type EquipmentList = string[];
export type TargetList = string[];
