import { Edit } from "lucide-react";
import { useCompanyStore } from "@store/comapny/companyStore";
import { useState, useReducer, useEffect } from "react";
import { z } from "zod";
import { updateInfo } from "@services/api/companyServices";
import { FormData } from "../../interfaces/inputs.interface";
import { Input, FileUpload } from "../../Inputs";
import { debouncedValidateSlug } from "../../Utils";

const CompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  urlSlug: z
    .string()
    .min(1, "URL slug is required")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Only letters, numbers, dashes and underscores allowed",
    ),
  tagline: z.string().optional(),
  logo: z.string().optional(),
});

type FormFields = z.infer<typeof CompanySchema>;

type ErrorAction =
  | { type: "SET_ERRORS"; payload: Partial<FormFields> }
  | { type: "CLEAR_ERROR"; payload: keyof FormFields };

function errorReducer(
  state: Partial<FormFields>,
  action: ErrorAction,
): Partial<FormFields> {
  switch (action.type) {
    case "SET_ERRORS":
      return { ...state, ...action.payload };
    case "CLEAR_ERROR":
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default function PageInfo() {
  const { company, updateBasicInfo, updateLogo } = useCompanyStore();
  const [isSlugValidating, setIsSlugValidating] = useState(false);
  const [errors, dispatchError] = useReducer(errorReducer, {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state management
  const [formData, setFormData] = useState<Partial<FormFields>>({
    logo: company?.logo,
    urlSlug: company?.urlSlug,
    name: company?.name,
    tagline: company?.tagline,
  });

  const [initialData] = useState<Partial<FormFields>>({
    logo: company?.logo,
    urlSlug: company?.urlSlug,
    name: company?.name,
    tagline: company?.tagline,
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Check for changes whenever formData changes
  useEffect(() => {
    const changesExist = Object.keys(formData).some((key) => {
      const formKey = key as keyof typeof formData;
      return formData[formKey] !== initialData[formKey];
    });
    setHasChanges(changesExist);
  }, [formData, initialData]);

  // Handle field changes
  const handleFieldChange = <K extends keyof FormFields>(
    field: K,
    value: FormFields[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    dispatchError({ type: "CLEAR_ERROR", payload: field });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) return;

    setIsSubmitting(true);
    try {
      const result = CompanySchema.safeParse(formData);

      if (!result.success) {
        const formattedErrors = result.error.format();
        dispatchError({
          type: "SET_ERRORS",
          payload: Object.fromEntries(
            Object.entries(formattedErrors).filter(
              ([key]) => key !== "_errors",
            ),
          ),
        });
        return;
      }

      const response = await updateInfo(formData as FormData);

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Submission failed");
      }

      updateBasicInfo(formData);
      setFormData({
        logo: response.data.logo || formData.logo,
        urlSlug: response.data.urlSlug || formData.urlSlug,
        name: response.data.name || formData.name,
        tagline: response.data.tagline || formData.tagline,
      });
    } catch (error) {
      console.error("Submission error:", error);
      dispatchError({
        type: "SET_ERRORS",
        payload: { logo: "Failed to submit form. Please try again." },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-warmWhite dark:bg-darkGray">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
            Page info
          </h3>

          <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-white dark:border-darkGray bg-white dark:bg-darkGray">
            <img
              src={formData.logo}
              className="w-full h-full object-cover"
              alt="Company logo"
            />
          </div>

          <FileUpload
            label="Update the Logo"
            accept="image/*"
            onChange={(file) => {
              handleFieldChange("logo", file!);
            }}
            description="300x300px recommended. JPG, JPEG, or PNG."
            error={errors.logo}
          />

          <Input
            icon={<Edit className="h-5 w-5" />}
            label="Company name"
            value={formData.name || ""}
            onChange={(value) => handleFieldChange("name", value)}
            error={errors.name}
            placeholder="Enter company name"
          />

          <Input
            label="Company URL"
            value={formData.urlSlug || ""}
            onChange={async (value) => {
              handleFieldChange("urlSlug", value);
              try {
                const available: boolean = await debouncedValidateSlug(
                  value,
                  setIsSlugValidating,
                );
                if (available && value != initialData.urlSlug) {
                  dispatchError({
                    type: "SET_ERRORS",
                    payload: { urlSlug: "This URL slug is already taken" },
                  });
                }
              } catch (error) {
                dispatchError({
                  type: "SET_ERRORS",
                  payload: { urlSlug: "Error validating slug" },
                });
              } finally {
                setIsSlugValidating(false);
              }
            }}
            error={errors.urlSlug}
            prefix="joblinc.me/company/"
            placeholder="your-company"
            loading={isSlugValidating}
          />

          <Input
            icon={<Edit className="h-5 w-5" />}
            label="Tagline"
            value={formData.tagline || ""}
            onChange={(value) => handleFieldChange("tagline", value)}
            placeholder="Empowering businesses through innovation"
            error={errors.tagline}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !hasChanges}
          className={`w-2/6 mt-3 px-4 py-2 text-white font-medium rounded-md transition-colors ${
            !hasChanges
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-crimsonRed hover:bg-darkBurgundy"
          } ${isSubmitting ? "bg-mutedSilver cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
