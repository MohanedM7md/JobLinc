import React, { useState, useReducer } from "react";
import { Location, FormData_Interface } from "./interfaces/inputs.interface";
import { z } from "zod";
import {
  Building2,
  Briefcase,
  Users,
  Globe,
  FileText,
  Phone,
  Locate,
  Home,
} from "lucide-react";
import { companySizes, companyTypes, workplaceTypes } from "./form-config";
import {
  Input,
  Select,
  FileUpload,
  TextArea,
  DateInput,
  LocationInputs,
} from "./Inputs";
import { debouncedValidateSlug } from "./Utils";
import { createCompnay } from "@services/api/companyServices";
import { useNavigate } from "react-router-dom";

const CompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  urlSlug: z
    .string()
    .min(1, "URL slug is required")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Only letters, numbers, dashes and underscores allowed",
    ),
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
  tagline: z.string().optional(),
  workplace: z.string().default("Onsite"),
  logo: z.string().optional(),
  coverPhoto: z.string().optional(),
  locations: z
    .array(
      z.object({
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        country: z.string().min(1, "Country is required"),
        primary: z.boolean().optional(),
      }),
    )
    .optional(),
  website: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const urlPattern =
          /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
        if (!urlPattern.test(value)) return false;

        try {
          const urlToCheck = value.includes("://") ? value : `https://${value}`;
          new URL(urlToCheck);
          return true;
        } catch {
          return false;
        }
      },
      {
        message:
          "Invalid website URL - must be in format like 'example.com', 'www.example.com', or 'https://example.com'",
      },
    )
    .nullish(),
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

export const CompanyForm = () => {
  // Form States
  const [name, setName] = useState<string | null>("");
  const [foundedDate, setFoundedDate] = useState<Date | null>(null);
  const [urlSlug, setUrlSlug] = useState<string | null>("");
  const [industry, setIndustry] = useState<string | null>("");
  const [size, setSize] = useState<string | null>("");
  const [type, setType] = useState<string | null>("");
  const [overview, setOverview] = useState<string | null>("");
  const [tagline, setTagline] = useState<string | null>("");
  const [workplace, setWorkplace] = useState<string | null>("Onsite");
  const [phone, setPhoneNumber] = useState<string | null>("");
  const [website, setWebsite] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[] | null>([]);
  const [logo, setLogo] = useState<string | null>("");
  const [coverPhoto, setCoverPhoto] = useState<string | null>("");
  const [isSlugValidating, setIsSlugValidating] = useState(false);

  // Validation States
  const [errors, dispatchError] = useReducer(errorReducer, {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("I am submitting");
    try {
      const formData: FormData_Interface = {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(urlSlug && { urlSlug }),
        ...(industry && { industry }),
        ...(foundedDate && { founded: foundedDate }),
        ...(size && { size }),
        ...(type && { type }),
        ...(overview && { overview }),
        ...(tagline && { tagline }),
        ...(website && { website }),
        ...(workplace && { workplace }),
        ...(logo && { logo }),
        ...(coverPhoto && { coverPhoto }),
        ...(locations && locations.length > 0 && { locations }),
      };
      console.log("Logo ", logo);
      const result = CompanySchema.safeParse(formData);
      console.log(result);
      if (!result.success) {
        const formattedErrors = result.error.format();
        dispatchError({
          type: "SET_ERRORS",
          payload: Object.fromEntries(
            Object.entries(formattedErrors).filter(([key, value], index) => {
              if (index !== 0) return [key, value];
            }),
          ),
        });
        console.log("formated error", formattedErrors);
        return;
      }
      console.log("Outer fomr Data", formData);

      const response = await createCompnay(formData);

      if (response.status < 200 || response.status >= 300)
        throw new Error("Submission failed");
      const companyId: string = response.data.id;
      setName("");
      setUrlSlug("");
      setIndustry("");
      setSize("");
      setType("");
      setOverview("");
      setTagline("");
      setWorkplace("Onsite");
      setLogo(null);
      setCoverPhoto(null);
      navigate(`/company/admin/${companyId}`);
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
    <div className="min-h-screen bg-warmWhite dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12">
      <div
        className="relative max-w-3xl w-full px-8 py-10 bg-white/80 dark:bg-black/60
                        shadow-2xl rounded-3xl backdrop-blur-md border border-slate-200 dark:border-charcoalBlack/40
                        ring-1 ring-pink-100 dark:ring-slate-800 ring-inset overflow-hidden"
      >
        <div className="absolute -top-10 -left-8">
          <Building2 className="h-16 w-16 text-crimsonRed opacity-10 blur-[2px]" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-7">
          <h2 className="text-3xl font-bold text-crimsonRed dark:text-pink-200 mb-4 tracking-tight">
            Create Company Page{" "}
            <Briefcase className="inline-block align-middle h-6 w-6 text-crimsonRed animate-bounce" />
          </h2>

          <div className="space-y-4">
            <Input
              icon={<Building2 className="h-5 w-5" />}
              label="Company name"
              value={name || ""}
              onChange={(Name) => {
                setName(Name);
                dispatchError({ type: "CLEAR_ERROR", payload: "name" });
              }}
              error={errors.name}
              placeholder="Enter company name"
            />

            <Input
              label="Company URL"
              value={urlSlug || ""}
              onChange={async (UrlSlug) => {
                setUrlSlug(UrlSlug);
                dispatchError({ type: "CLEAR_ERROR", payload: "urlSlug" });
                try {
                  const available: boolean = await debouncedValidateSlug(
                    UrlSlug,
                    setIsSlugValidating,
                  );
                  if (available) {
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
              icon={<Briefcase className="h-5 w-5" />}
              label="Industry"
              value={industry || ""}
              onChange={(Industry) => {
                setIndustry(Industry);
                dispatchError({ type: "CLEAR_ERROR", payload: "industry" });
              }}
              error={errors.industry}
              placeholder="ex: Information Services"
            />

            <Select
              icon={<Users className="h-5 w-5" />}
              label="Company size"
              options={companySizes}
              selected={size!}
              onSelect={(size) => {
                setSize(size);
                dispatchError({ type: "CLEAR_ERROR", payload: "size" });
              }}
              error={errors.size}
            />

            <Select
              icon={<Building2 className="h-5 w-5" />}
              label="Company type"
              options={companyTypes}
              selected={type!}
              onSelect={(Type) => {
                setType(Type);
                dispatchError({ type: "CLEAR_ERROR", payload: "type" });
              }}
              error={errors.type}
            />
            <DateInput
              label="Foundation date"
              value={foundedDate}
              onChange={setFoundedDate}
              error={errors.founded}
            />
            <TextArea
              label="Company overview"
              value={overview!}
              onChange={(Overview) => {
                setOverview(Overview);
                dispatchError({ type: "CLEAR_ERROR", payload: "overview" });
              }}
              error={errors.overview}
              placeholder="Tell us about your company"
            />

            <Input
              icon={<FileText className="h-5 w-5" />}
              label="Tagline"
              value={tagline!}
              onChange={(tagline) => {
                setTagline(tagline);
                dispatchError({ type: "CLEAR_ERROR", payload: "tagline" });
              }}
              placeholder="Empowering businesses through innovation"
              error={errors.tagline}
            />

            <Input
              icon={<Phone className="h-5 w-5" />}
              label="Phone"
              value={phone!}
              onChange={(phoneNumber) => {
                setPhoneNumber(phoneNumber);
                dispatchError({ type: "CLEAR_ERROR", payload: "phone" });
              }}
              placeholder="zero onein"
              error={errors.phone}
            />

            <Input
              icon={<Globe className="h-5 w-5" />}
              label="website"
              value={website!}
              onChange={(website) => {
                setWebsite(website);
                dispatchError({ type: "CLEAR_ERROR", payload: "website" });
              }}
              placeholder="www.company.org"
              error={errors.website}
            />

            <Select
              icon={<Locate className="h-5 w-5" />}
              label="Workplace type"
              options={workplaceTypes}
              selected={workplace!}
              onSelect={setWorkplace}
              error={errors.workplace}
            />

            <FileUpload
              label="Company Logo"
              accept="image/*"
              onChange={(file) => {
                setLogo(file);
                dispatchError({ type: "CLEAR_ERROR", payload: "logo" });
              }}
              description="300x300px recommended. JPG, JPEG, or PNG."
              error={errors.logo}
            />

            <FileUpload
              label="Cover Photo"
              accept="image/*"
              onChange={(file) => {
                setCoverPhoto(file);
                dispatchError({ type: "CLEAR_ERROR", payload: "coverPhoto" });
              }}
              description="Recommended size: 1128x191 pixels"
              error={
                typeof errors.coverPhoto === "string"
                  ? errors.coverPhoto
                  : undefined
              }
            />
          </div>
          <LocationInputs
            locations={locations!}
            onChange={setLocations}
            errors={errors.locations}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 font-semibold rounded-xl
            bg-crimsonRed
            text-white cursor-pointer
             transition disabled:bg-mutedSilver disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>
                <span className="inline-block animate-spin mr-2">🔄</span>
                Creating...
              </span>
            ) : (
              <>Create Company Page</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
