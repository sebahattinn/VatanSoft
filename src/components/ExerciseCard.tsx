import { type Exercise } from "@/types/exercise";
import { isFavorite, toggleFavorite } from "@/utils/favorites";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { useState } from "react";

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

export function ExerciseCard({ exercise, onClick }: Props) {
  const [fav, setFav] = useState<boolean>(isFavorite(exercise.id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(exercise.id);
    setFav(!fav);
  };

  return (
    <Card
      onClick={onClick}
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 z-10" />
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-20 bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={handleFavorite}
        >
          <Heart
            className={cn(
              "size-5 transition-colors",
              fav ? "fill-red-500 stroke-red-500" : "stroke-white"
            )}
          />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-1">{exercise.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{exercise.bodyPart}</Badge>
          <Badge variant="outline">{exercise.target}</Badge>
          <Badge variant="outline">{exercise.equipment}</Badge>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        Detayları görüntülemek için tıklayın
      </CardFooter>
    </Card>
  );
}
