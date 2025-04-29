import { months } from "@utils/months";
import { NewExperience } from "interfaces/userInterfaces";
import { addExperience } from "@services/api/userProfileServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface AddExperienceProps {
  onUpdate: () => void;
  onClose: () => void;
}

const schema = z
  .object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    description: z.string().min(1, "Description is required"), //this shouldn't be a required field (god damn backend)
    startMonth: z.coerce.number().min(1, "Invalid start month").max(12),
    startYear: z.coerce.number().min(1900, "Invalid start year"),
    endMonth: z.coerce.number().min(1, "Invalid end month").max(12),
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

type ExperienceFields = z.infer<typeof schema>;

export default function AddExperience(props: AddExperienceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFields>({
    resolver: zodResolver(schema),
  });

  const addExperienceMutation = useMutation({
    mutationFn: addExperience,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const onSubmit: SubmitHandler<ExperienceFields> = (data) => {
    const newExperience: NewExperience = {
      position: data.position,
      company: data.company,
      description: data.description,
      startDate: new Date(data.startYear, data.startMonth - 1, 1),
      endDate: new Date(data.endYear, data.endMonth - 1, 1),
    };
    toast.promise(addExperienceMutation.mutateAsync(newExperience), {
      loading: "Adding experience...",
      success: "Experience added successfully",
      error: (error) => error.message,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-lightGray rounded-lg text-charcoalBlack"
    >
      <div className="mb-4">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          {...register("position")}
          className="w-full px-2 py-1 border rounded-lg"
          disabled={addExperienceMutation.status === "pending"}
        />
        {errors.position && (
          <p className="text-sm text-red-600">{errors.position.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Company</label>
        <input
          type="text"
          {...register("company")}
          className="w-full px-2 py-1 border rounded-lg"
          disabled={addExperienceMutation.status === "pending"}
        />
        {errors.company && (
          <p className="text-sm text-red-600">{errors.company.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Start Date</label>
        <div className="flex gap-2">
          <select
            {...register("startMonth")}
            className="w-1/2 px-2 py-1 border rounded-lg"
            disabled={addExperienceMutation.status === "pending"}
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            {...register("startYear")}
            className="w-1/2 px-2 py-1 border rounded-lg"
            disabled={addExperienceMutation.status === "pending"}
          >
            <option value="">Year</option>
            {Array.from(
              { length: 50 },
              (_, i) => new Date().getFullYear() - i,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {errors.startMonth && (
          <p className="text-sm text-red-600">{errors.startMonth.message}</p>
        )}
        {errors.startYear && (
          <p className="text-sm text-red-600">{errors.startYear.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">End Date</label>
        <div className="flex gap-2">
          <select
            {...register("endMonth")}
            className="w-1/2 px-2 py-1 border rounded-lg"
            disabled={addExperienceMutation.status === "pending"}
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            {...register("endYear")}
            className="w-1/2 px-2 py-1 border rounded-lg"
            disabled={addExperienceMutation.status === "pending"}
          >
            <option value="">Year</option>
            {Array.from(
              { length: 50 },
              (_, i) => new Date().getFullYear() - i,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {errors.endMonth && (
          <p className="text-sm text-red-600">{errors.endMonth.message}</p>
        )}
        {errors.endYear && (
          <p className="text-sm text-red-600">{errors.endYear.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full px-2 py-1 border rounded-lg"
          rows={4}
          disabled={addExperienceMutation.status === "pending"}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
          disabled={addExperienceMutation.status === "pending"}
        >
          {addExperienceMutation.status === "pending" ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
