import { months } from "@utils/months";
import {
  NewExperience,
  ExperienceModes,
  ExperienceTypes,
} from "../../../interfaces/userInterfaces";
import { addExperience } from "@services/api/userProfileServices";
import { searchCompanies } from "@services/api/companyServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { CompanyInterface } from "@interfaces/companyInterfaces";
import { Check } from "lucide-react";

interface AddExperienceProps {
  onUpdate: () => void;
  onClose: () => void;
}

const schema = z
  .object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    companyId: z.string().optional(),
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

export default function AddExperience(props: AddExperienceProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ExperienceFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      isPresent: false,
    },
  });

  const companyValue = watch("company");
  const [companyOptions, setCompanyOptions] = useState<CompanyInterface[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const addExperienceMutation = useMutation({
    mutationFn: addExperience,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const { isError: isCompaniesError } = useQuery({
    queryKey: ["Search companies by name", companyValue],
    enabled: typeof companyValue === "string" && companyValue.trim() !== "",
    queryFn: async () => {
      try {
        const data = await searchCompanies({name: companyValue});
        setCompanyOptions(data);
        return data;
      } catch {
        setCompanyOptions([]);
      }
    },
  });

  const onSubmit: SubmitHandler<ExperienceFields> = (data) => {
    const newExperience: NewExperience = {
      position: data.position,
      ...(data.companyId
        ? { companyId: data.companyId, company: data.company }
        : { company: data.company }),
      description: data.description,
      startDate: new Date(data.startYear, data.startMonth - 1, 1),
      endDate: data.isPresent
        ? "Present"
        : new Date(data.endYear ?? 0, (data.endMonth ?? 1) - 1, 1),
      type: data.type,
      mode: data.mode,
    };
    console.log(newExperience);
    toast.promise(addExperienceMutation.mutateAsync(newExperience), {
      loading: "Adding experience...",
      success: "Added!",
      error: (error) => error.message,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded-lg">
      <div className="mb-4">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          {...register("position")}
          className={`w-full px-2 py-1 border rounded-lg ${
            addExperienceMutation.status === "pending"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={addExperienceMutation.status === "pending"}
        />
        {errors.position && (
          <p className="text-sm text-red-600">{errors.position.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium">Company</label>
        <div className="relative">
          <input
            type="text"
            autoComplete="off"
            {...register("company")}
            onFocus={() => {
              setValue("companyId", undefined);
              setIsInputFocused(true);
            }}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Search for a company"
            className={`w-full px-2 py-1 border rounded-lg ${
              addExperienceMutation.status === "pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={addExperienceMutation.status === "pending"}
          />
          {watch("companyId") && (
            <Check className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500" />
          )}
        </div>
        {isInputFocused && companyOptions.length > 0 && (
          <ul className="w-10/12 px-2 py-1 absolute border rounded-lg mt-2 max-h-40 overflow-y-auto bg-white z-10">
            {companyOptions.map((company) => (
              <li
                key={company.id}
                onMouseDown={() => {
                  setValue("company", company.name);
                  setValue("companyId", company.id);
                }}
                className="px-2 py-1 cursor-pointer hover:bg-gray-200"
              >
                {company.name}
              </li>
            ))}
          </ul>
        )}
        {isCompaniesError && (
          <p className="text-sm text-red-600">Error fetching companies</p>
        )}
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
              addExperienceMutation.status === "pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
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
            className={`w-1/2 px-2 py-1 border rounded-lg ${
              addExperienceMutation.status === "pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
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
            className={`w-1/2 px-2 py-1 border rounded-lg ${
              watch("isPresent") || addExperienceMutation.status === "pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              addExperienceMutation.status === "pending" || watch("isPresent")
            }
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
              watch("isPresent") || addExperienceMutation.status === "pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              addExperienceMutation.status === "pending" || watch("isPresent")
            }
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
            disabled={addExperienceMutation.status === "pending"}
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
          className={`w-full px-2 py-1 border rounded-lg ${
            addExperienceMutation.status === "pending"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={addExperienceMutation.status === "pending"}
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
          className={`w-full px-2 py-1 border rounded-lg ${
            addExperienceMutation.status === "pending"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={addExperienceMutation.status === "pending"}
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
          className={`w-full px-2 py-1 border rounded-lg ${
            addExperienceMutation.status === "pending"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
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
          className={`bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out ${
            addExperienceMutation.status === "pending"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={addExperienceMutation.status === "pending"}
        >
          {addExperienceMutation.status === "pending" ? (
            <span className="flex items-center">
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              Adding...
            </span>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </form>
  );
}
