import { type Exercise } from "@/types/exercise";
import { isFavorite, toggleFavorite } from "@/utils/favorites";
import { Button } from "./ui/button";
import { useState } from "react";

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

export function ExerciseCard({ exercise, onClick }: Props) {
  const [fav, setFav] = useState<boolean>(isFavorite(exercise.id));

  const handleFavorite = () => {
    toggleFavorite(exercise.id);
    setFav(!fav);
  };

  return (
    <div
      className="border rounded-lg p-4 hover:shadow-lg cursor-pointer relative"
      onClick={onClick}
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold text-lg">{exercise.name}</h3>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>Bölge: {exercise.bodyPart}</p>
        <p>Hedef: {exercise.target}</p>
        <p>Ekipman: {exercise.equipment}</p>
      </div>
      <Button
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          handleFavorite();
        }}
      >
        {fav ? "❤️" : "🤍"}
      </Button>
    </div>
  );
}
