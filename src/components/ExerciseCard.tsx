import { type Exercise } from "@/types/exercise";
import { isFavorite, toggleFavorite } from "@/utils/favorites";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

// Helper function to capitalize and format strings
const formatText = (text: string) => {
  // Split by spaces or hyphens and capitalize each word
  return text
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Emoji mapping for body parts
const bodyPartEmojis: Record<string, string> = {
  back: "🔙",
  cardio: "🫀",
  chest: "💪",
  "lower arms": "💪",
  "lower legs": "🦵",
  neck: "👆",
  shoulders: "💪",
  "upper arms": "💪",
  "upper legs": "🦵",
  waist: "⬇️",
};

export function ExerciseCard({ exercise, onClick }: Props) {
  const [fav, setFav] = useState<boolean>(isFavorite(exercise.id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(exercise.id);
    setFav(!fav);
  };

  // Format the exercise name and other fields
  const formattedName = formatText(exercise.name);
  const formattedBodyPart = formatText(exercise.bodyPart);
  const formattedTarget = formatText(exercise.target);
  const formattedEquipment = formatText(exercise.equipment);

  return (
    <Card
      onClick={onClick}
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <img
          src={exercise.gifUrl}
          alt={formattedName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          onClick={handleFavorite}
        >
          <Heart
            className={cn(
              "size-5 transition-colors",
              fav ? "fill-red-500 stroke-red-500" : "stroke-white"
            )}
          />
        </Button>

        {/* Exercise Type Badge */}
        <Badge
          variant="secondary"
          className="absolute bottom-2 left-2 z-20 bg-white/10 backdrop-blur-sm text-white border-none"
        >
          {bodyPartEmojis[exercise.bodyPart.toLowerCase()] || "💪"}{" "}
          {formattedBodyPart}
        </Badge>
      </div>

      {/* Content */}
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg font-semibold line-clamp-1">
          {formattedName}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            🎯 Target: {formattedTarget}
          </Badge>
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            🧰 Equipment: {formattedEquipment}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <p className="text-xs text-muted-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
          <span className="inline-block w-1 h-1 rounded-full bg-current" />
          Click to view details
        </p>
      </CardFooter>
    </Card>
  );
}
