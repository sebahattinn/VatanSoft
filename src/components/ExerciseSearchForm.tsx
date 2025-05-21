import { useFormik } from "formik";
import * as Yup from "yup";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ExerciseSearchForm({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const formik = useFormik({
    initialValues: { search: "" },
    validationSchema: Yup.object({
      search: Yup.string().min(2, "Please enter at least 2 characters"),
    }),
    onSubmit: (values) => onSearch(values.search),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="relative">
      <div className="relative">
        <Input
          name="search"
          placeholder="Search exercises by name..."
          value={formik.values.search}
          onChange={formik.handleChange}
          className="pr-12"
          aria-label="Search exercises"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          aria-label="Search"
        >
          <Search className="h-4 w-4 text-gray-500" />
        </Button>
      </div>

      {formik.touched.search && formik.errors.search && (
        <p className="text-xs text-red-500 mt-1 ml-1">{formik.errors.search}</p>
      )}
    </form>
  );
}
