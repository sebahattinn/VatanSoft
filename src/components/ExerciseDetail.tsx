import { useExerciseDetail } from "@/services/exerciseService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <DialogContent className="!max-w-5xl h-[90vh] p-6 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <DialogHeader className="px-0">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {isLoading ? <Skeleton className="h-8 w-64" /> : exercise?.name}
          </DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              <p className="text-gray-600 text-sm">
                {exercise?.bodyPart} | {exercise?.target}
              </p>
            )}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-8rem)] mt-6 pr-4">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <Card className="overflow-hidden border-2">
                <CardContent className="p-0">
                  <div className="relative group">
                    <img
                      src={exercise?.gifUrl}
                      alt={exercise?.name}
                      className="w-full max-h-96 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="transition-all duration-300 hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Badge variant="default" className="mb-3 font-medium">
                        Body Part
                      </Badge>
                      <p className="text-lg font-semibold capitalize">
                        {exercise?.bodyPart}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="transition-all duration-300 hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Badge variant="default" className="mb-3 font-medium">
                        Target
                      </Badge>
                      <p className="text-lg font-semibold capitalize">
                        {exercise?.target}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="transition-all duration-300 hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Badge variant="default" className="mb-3 font-medium">
                        Equipment
                      </Badge>
                      <p className="text-lg font-semibold capitalize">
                        {exercise?.equipment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pb-4">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Instructions
                </h3>
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <ol className="list-decimal space-y-4">
                      {exercise?.instructions.map((instruction, idx) => (
                        <li
                          key={idx}
                          className="text-gray-600 ml-5 pl-2 text-[15px] leading-relaxed"
                        >
                          {instruction}
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
