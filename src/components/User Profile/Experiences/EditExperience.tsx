import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { months } from "@utils/months";
import {
  deleteExperience,
  editExperience,
} from "@services/api/userProfileServices";
import ConfirmAction from "../../utils/ConfirmAction";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";
import { useState } from "react";
import {
  ExperienceInterface,
  ExperienceModes,
  ExperienceTypes,
} from "../../../interfaces/userInterfaces"; //Import path isn't working for some reason

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
    isPresent: z.boolean(),
    endMonth: z.coerce.number().max(12).optional(),
    endYear: z.coerce.number().optional(),
    mode: z.nativeEnum(ExperienceModes),
    type: z.nativeEnum(ExperienceTypes),
  })
  .refine(
    (data) =>
      data.isPresent ||
      (data.endMonth !== undefined &&
        data.endYear !== undefined &&
        data.endMonth !== 0 &&
        data.endYear !== 0 &&
        (data.startYear < data.endYear ||
          (data.startYear === data.endYear &&
            data.startMonth < data.endMonth))),
    {
      message: "Start date must be before end date",
      path: ["endYear"],
    },
  )
  .refine(
    (data) => data.isPresent || (data.endMonth !== 0 && data.endYear !== 0),
    {
      message: "End month and year must be specified if 'isPresent' is false",
      path: ["endMonth"],
    },
  );

type ExperienceFields = z.infer<typeof schema>;

export default function EditExperience(props: EditExperienceProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
      type: props.type,
      mode: props.mode,
      isPresent: props.endDate === "Present",
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
      id: props.id,
      position: data.position,
      company: data.company,
      description: data.description,
      startDate: new Date(data.startYear, data.startMonth - 1, 1),
      endDate: data.isPresent
        ? "Present"
        : new Date(data.endYear ?? 0, (data.endMonth ?? 1) - 1, 1),
      type: data.type,
      mode: data.mode,
    };
    toast.promise(editExperienceMutation.mutateAsync(editedExperience), {
      loading: "Saving experience...",
      success: "Experience edited successfully",
      error: (error) => error.message,
    });
  };

  const handleDelete = () => {
    toast.promise(deleteExperienceMutation.mutateAsync(props.id), {
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
            className={`w-full px-2 py-1 border rounded-lg ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
            className={`w-full px-2 py-1 border rounded-lg ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
              className={`w-1/2 px-2 py-1 border rounded-lg ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
              className={`w-1/2 px-2 py-1 border rounded-lg ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
              className={`w-1/2 px-2 py-1 border rounded-lg ${
                watch("isPresent") || isProcessing
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isProcessing || watch("isPresent")}
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
              className={`w-1/2 px-2 py-1 border rounded-lg ${
                watch("isPresent") || isProcessing
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isProcessing || watch("isPresent")}
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
          <label className="text-sm font-medium flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isPresent")}
              className="w-4 h-4"
              disabled={isProcessing}
            />
            Currently Working Here
          </label>
          {errors.isPresent && (
            <p className="text-sm text-red-600">{errors.isPresent.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Mode</label>
          <select
            {...register("mode")}
            className="w-full px-2 py-1 border rounded-lg"
            disabled={isProcessing}
          >
            <option value="">Select Mode</option>
            {Object.values(ExperienceModes).map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          {errors.mode && (
            <p className="text-sm text-red-600">{errors.mode.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Type</label>
          <select
            {...register("type")}
            className="w-full px-2 py-1 border rounded-lg"
            disabled={isProcessing}
          >
            <option value="">Select Type</option>
            {Object.values(ExperienceTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-sm text-red-600">{errors.type.message}</p>
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
            className={`bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isProcessing}
          >
            {editExperienceMutation.status === "pending" ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className={`bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700 transition duration-400 ease-in-out ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
