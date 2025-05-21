import { ExerciseList } from "./components/ExerciseList";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ExerciseList />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
