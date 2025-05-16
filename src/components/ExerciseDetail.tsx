import { useExerciseDetail } from "@/services/exerciseService";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface ExerciseDetailProps {
  exerciseId: string;
  onClose: () => void;
}

export default function ExerciseDetail({
  exerciseId,
  onClose,
}: ExerciseDetailProps) {
  const { data: exercise, isLoading } = useExerciseDetail(exerciseId);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <Button
          variant="default"
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </Button>

        {isLoading ? (
          <>
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-24 w-full" />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">{exercise?.name}</h2>
            <img
              src={exercise?.gifUrl}
              alt={exercise?.name}
              className="w-full max-h-96 object-contain rounded-lg mb-6"
            />
            <h3 className="font-semibold mb-2">Talimatlar:</h3>
            <ol className="list-decimal list-inside space-y-2 mb-6">
              {exercise?.instructions.map((ins, idx) => (
                <li key={idx}>{ins}</li>
              ))}
            </ol>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">Bölge</p>
                <p className="text-muted-foreground">{exercise?.bodyPart}</p>
              </div>
              <div>
                <p className="font-medium">Hedef</p>
                <p className="text-muted-foreground">{exercise?.target}</p>
              </div>
              <div>
                <p className="font-medium">Ekipman</p>
                <p className="text-muted-foreground">{exercise?.equipment}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
