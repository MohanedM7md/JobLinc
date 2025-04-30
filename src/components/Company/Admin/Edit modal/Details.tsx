import React, { useState, useReducer, useEffect, useMemo } from "react";
import { Input, TextArea, Select, DateInput } from "../../Inputs";
import { companySizes, companyTypes } from "../../form-config";
import { z } from "zod";
import {
  Globe,
  BriefcaseBusiness,
  Users,
  Building2,
  Phone,
  CalendarDays,
  AlignLeft,
} from "lucide-react";

import { updateInfo } from "@services/api/companyServices";
import { useCompanyStore } from "@store/comapny/companyStore";

const CompanySchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  type: z.string().min(1, "Company type is required"),
  overview: z.string().min(1, "Overview is required"),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9]+$/.test(value), {
      message: "Phone number must contain only digits",
    }),
  founded: z.date().optional(),
  website: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Invalid website URL",
    }),
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

const OrganizationEditForm = () => {
  const { company, updateBasicInfo } = useCompanyStore();
  const [errors, dispatchError] = useReducer(errorReducer, {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState<Partial<FormFields>>({
    industry: company?.industry || "",
    size: company?.size || "",
    type: company?.type || "",
    overview: company?.overview || "",
    phone: company?.phone || "",
    website: company?.website || "",
    founded: company?.founded ? new Date(company.founded) : undefined,
  });

  const initialData = useMemo<Partial<FormFields>>(
    () => ({
      industry: company?.industry || "",
      size: company?.size || "",
      type: company?.type || "",
      overview: company?.overview || "",
      phone: company?.phone || "",
      website: company?.website || "",
      founded: company?.founded ? new Date(company.founded) : undefined,
    }),
    [company],
  );

  // Check for changes whenever formData changes
  useEffect(() => {
    const changesExist = Object.keys(formData).some((key) => {
      const formKey = key as keyof typeof formData;
      if (formKey === "founded") {
        return formData[formKey]?.getTime() !== initialData[formKey]?.getTime();
      }
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

      const response = await updateInfo(formData as FormFields);

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Submission failed");
      }
      updateBasicInfo(formData);
      setFormData({
        industry: response.data.industry || formData.industry,
        size: response.data.size || formData.size,
        type: response.data.type || formData.type,
        overview: response.data.overview || formData.overview,
        phone: response.data.phone || formData.phone,
        website: response.data.website || formData.website,
        founded: response.data.founded
          ? new Date(response.data.founded)
          : formData.founded,
      });
    } catch (error) {
      console.error("Submission error:", error);
      dispatchError({
        type: "SET_ERRORS",
        payload: { overview: "Failed to submit form. Please try again." },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="org-page-edit-modal__spacing-wrapper flex justify-center w-full bg-warmWhite">
      <form className="org-page-edit-modal__form w-4/5" onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 ">
          Provide details to display on your page
        </h3>

        <fieldset>
          <TextArea
            label="Company overview"
            value={formData.overview || ""}
            onChange={(value) => handleFieldChange("overview", value)}
            error={errors.overview}
            placeholder="Tell us about your company"
          />

          <Input
            icon={<Globe className="h-5 w-5 text-mutedSilver" />}
            label="Website"
            value={formData.website || ""}
            onChange={(value) => handleFieldChange("website", value)}
            placeholder="www.company.org"
            error={errors.website}
          />

          <Input
            icon={<BriefcaseBusiness className="h-5 w-5 text-mutedSilver" />}
            label="Industry"
            value={formData.industry || ""}
            onChange={(value) => handleFieldChange("industry", value)}
            error={errors.industry}
            placeholder="e.g., Information Services"
          />

          <Select
            icon={<Users className="h-5 w-5 text-mutedSilver" />}
            label="Company size"
            options={companySizes}
            selected={formData.size || ""}
            onSelect={(value) => handleFieldChange("size", value)}
            error={errors.size}
          />

          <Select
            icon={<Building2 className="h-5 w-5 text-mutedSilver" />}
            label="Company type"
            options={companyTypes}
            selected={formData.type || ""}
            onSelect={(value) => handleFieldChange("type", value)}
            error={errors.type}
          />

          <Input
            icon={<Phone className="h-5 w-5 text-mutedSilver" />}
            label="Phone"
            value={formData.phone || ""}
            onChange={(value) => handleFieldChange("phone", value)}
            placeholder="e.g., 01001234567"
            error={errors.phone}
          />

          <DateInput
            label="Foundation date"
            value={formData.founded || null}
            onChange={(value) => handleFieldChange("founded", value!)}
            error={errors.founded}
          />
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting || !hasChanges}
          className={`w-2/6 mt-5 mb-2 px-5 py-2.5 text-white font-semibold rounded-lg transition-colors shadow-sm ${
            !hasChanges
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-crimsonRed hover:bg-darkBurgundy"
          } ${isSubmitting ? "bg-mutedSilver cursor-wait" : ""}`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default OrganizationEditForm;
