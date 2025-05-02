import { SubmitHandler, useForm } from "react-hook-form";
import { NewEducation } from "interfaces/userInterfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEducation } from "@services/api/userProfileServices";
import { months } from "@utils/months";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";

interface AddEducationProps {
  onUpdate: () => void;
  onClose: () => void;
}

const schema = z
  .object({
    degree: z.string().min(1, "Degree is required"),
    school: z.string().min(1, "School is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    description: z.string().min(1, "Description is required"),
    CGPA: z.coerce.number().min(0, "Invalid CGPA").max(4, "Invalid CGPA"),
    startMonth: z.coerce
      .number()
      .min(1, "Invalid start month")
      .max(12, "Invalid start month"),
    startYear: z.coerce.number().min(1900, "Invalid start year"),
    endMonth: z.coerce
      .number()
      .min(1, "Invalid end month")
      .max(12, "Invalid end month"),
    endYear: z.coerce.number().min(1900, "Invalid end year"),
  })
  .refine(
    (data) =>
      data.startYear < data.endYear ||
      (data.startYear === data.endYear && data.startMonth < data.endMonth),
    {
      message: "Start date must be before end date",
      path: ["endYear"],
    },
  );

type EducationFields = z.infer<typeof schema>;

export default function AddEducation(props: AddEducationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFields>({
    resolver: zodResolver(schema),
  });

  const addEducationMutation = useMutation({
    mutationFn: addEducation,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const isProcessing = addEducationMutation.status === "pending";

  const onSubmit: SubmitHandler<EducationFields> = (data) => {
    console.log("submitting", data);
    const newEducation: NewEducation = {
      degree: data.degree,
      school: data.school,
      fieldOfStudy: data.fieldOfStudy,
      description: data.description,
      CGPA: typeof data.CGPA === "string" ? 0 : data.CGPA,
      startDate: new Date(data.startYear, data.startMonth - 1, 1),
      endDate: new Date(data.endYear, data.endMonth - 1, 1),
    };

    toast.promise(addEducationMutation.mutateAsync(newEducation), {
      loading: "Adding education...",
      success: "Added",
      error: (error) => error.message,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded-lg">
      <div className="mb-4">
        <label className="text-sm font-medium">Degree</label>
        <input
          type="text"
          {...register("degree")}
          className="w-full px-2 py-1 border rounded-lg"
        />
        {errors.degree && (
          <p className="text-sm font-medium text-red-600 mt-1">
            {errors.degree.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">School</label>
        <input
          type="text"
          {...register("school")}
          className="w-full px-2 py-1 border rounded-lg"
        />
        {errors.school && (
          <p className="text-sm font-medium text-red-600 mt-1">
            {errors.school.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Field of Study</label>
        <input
          type="text"
          {...register("fieldOfStudy")}
          className="w-full px-2 py-1 border rounded-lg"
        />
        {errors.fieldOfStudy && (
          <p className="text-sm font-medium text-red-600 mt-1">
            {errors.fieldOfStudy.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Start Date</label>
        <div className="flex gap-2">
          <select
            {...register("startMonth")}
            className="w-1/2 px-2 py-1 border rounded-lg"
          >
            <option value={0}>Month</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            {...register("startYear")}
            className="w-1/2 px-2 py-1 border rounded-lg"
          >
            <option value={0}>Year</option>
            {Array.from(
              { length: 60 },
              (_, i) => new Date().getFullYear() - i,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {(errors.startMonth || errors.startYear) && (
          <p className="text-sm font-medium text-red-600 mt-1">
            {errors.startMonth?.message || errors.startYear?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">End Date</label>
        <div className="flex gap-2">
          <select
            {...register("endMonth")}
            className="w-1/2 px-2 py-1 border rounded-lg"
          >
            <option value={0}>Month</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            {...register("endYear")}
            className="w-1/2 px-2 py-1 border rounded-lg"
          >
            <option value={0}>Year</option>
            {Array.from(
              { length: 60 },
              (_, i) => new Date().getFullYear() - i + 7,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {(errors.endMonth || errors.endYear) && (
          <p className="text-sm font-medium text-red-600 mt-1">
            {errors.endMonth?.message || errors.endYear?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Cumulative GPA</label>
        <input
          type="number"
          step="0.01"
          {...register("CGPA")}
          className="w-full px-2 py-1 border rounded-lg"
        />
        {errors.CGPA && (
          <p className="text-sm font-medium text-red-600 mt-1">
            {errors.CGPA.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Description</label>
        <input
          type="text"
          {...register("description")}
          className="w-full px-2 py-1 border rounded-lg"
        />
        {errors.description && (
          <p className="text-sm font-medium text-red-600 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      {errors.root && (
        <p className="text-sm font-medium text-red-600 mt-1">
          {errors.root.message}
        </p>
      )}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
          disabled={isProcessing}
        >
          {isProcessing ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
