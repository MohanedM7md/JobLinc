import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { months } from "@utils/months";
import { ExperienceInterface } from "interfaces/userInterfaces";
import {
  deleteExperience,
  editExperience,
} from "@services/api/userProfileServices";
import ConfirmAction from "../../utils/ConfirmAction";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";
import { useState } from "react";

interface EditExperienceProps extends ExperienceInterface {
  onClose: () => void;
  onUpdate: () => void;
}

const schema = z
  .object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    description: z.string().min(1, "Description is required"),
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

export default function EditExperience(props: EditExperienceProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      position: props.position,
      company: props.company,
      description: props.description,
      startMonth: new Date(props.startDate).getMonth() + 1,
      startYear: new Date(props.startDate).getFullYear(),
      endMonth: new Date(props.endDate).getMonth() + 1,
      endYear: new Date(props.endDate).getFullYear(),
    },
  });

  const editExperienceMutation = useMutation({
    mutationFn: editExperience,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const isProcessing =
    editExperienceMutation.status === "pending" ||
    deleteExperienceMutation.status === "pending";

  const onSubmit = (data: ExperienceFields) => {
    const editedExperience: ExperienceInterface = {
      _id: props._id,
      position: data.position,
      company: data.company,
      description: data.description,
      startDate: new Date(data.startYear, data.startMonth - 1, 1),
      endDate: new Date(data.endYear, data.endMonth - 1, 1),
    };
    toast.promise(editExperienceMutation.mutateAsync(editedExperience), {
      loading: "Saving experience...",
      success: "Experience edited successfully",
      error: (error) => error.message,
    });
  };

  const handleDelete = () => {
    toast.promise(deleteExperienceMutation.mutateAsync(props._id), {
      loading: "Deleting experience...",
      success: "Experience deleted successfully",
      error: (error) => error.message,
    });
  };

  return (
    <>
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
            disabled={isProcessing}
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
            disabled={isProcessing}
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
              disabled={isProcessing}
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
              disabled={isProcessing}
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
              disabled={isProcessing}
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
              disabled={isProcessing}
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
            disabled={isProcessing}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
            disabled={isProcessing}
          >
            {editExperienceMutation.status === "pending" ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700 transition duration-400 ease-in-out"
            onClick={() => setShowConfirmDelete(true)}
            disabled={isProcessing}
          >
            {deleteExperienceMutation.status === "pending"
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </form>
      {showConfirmDelete && (
        <ConfirmAction
          action={handleDelete}
          onClose={() => setShowConfirmDelete(false)}
        />
      )}
    </>
  );
}
