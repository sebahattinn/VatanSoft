import { useExerciseDetail } from "@/services/exerciseService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

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
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl h-[90vh] p-6">
        <DialogHeader className="px-0">
          <DialogTitle className="text-2xl">
            {isLoading ? <Skeleton className="h-8 w-64" /> : exercise?.name}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-8rem)] mt-4 pr-4">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <img
                    src={exercise?.gifUrl}
                    alt={exercise?.name}
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                </CardContent>
              </Card>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        Bölge
                      </Badge>
                      <p className="text-lg font-medium">
                        {exercise?.bodyPart}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        Hedef
                      </Badge>
                      <p className="text-lg font-medium">{exercise?.target}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        Ekipman
                      </Badge>
                      <p className="text-lg font-medium">
                        {exercise?.equipment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>{" "}
              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-3">Talimatlar</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ol className="list-decimal space-y-3">
                      {exercise?.instructions.map((ins, idx) => (
                        <li
                          key={idx}
                          className="text-muted-foreground ml-5 pl-2"
                        >
                          {ins}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
