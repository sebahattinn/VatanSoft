import { useFormik } from "formik";
import * as Yup from "yup";
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
      search: Yup.string().min(2, "Min. 2 karakter"),
    }),
    onSubmit: (values) => onSearch(values.search),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex gap-2 items-start mb-4"
    >
      <Input
        name="search"
        placeholder="Egzersiz adıyla ara..."
        value={formik.values.search}
        onChange={formik.handleChange}
      />
      <Button type="submit">Ara</Button>
    </form>
  );
}
