import { useCompanyStore } from "@store/comapny/companyStore";
import { useState, useReducer, useEffect } from "react";
import { z } from "zod";
import { updateInfo } from "@services/api/companyServices";
import { LocationInputs } from "../../Inputs";

const CompanySchema = z.object({
  locations: z
    .array(
      z.object({
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        country: z.string().min(1, "Country is required"),
        primary: z.boolean().optional(),
      }),
    )
    .min(1, "At least one location is required"),
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

export default function LocationsForm() {
  const { company } = useCompanyStore();
  const [errors, dispatchError] = useReducer(errorReducer, {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locations, setLocations] = useState<FormFields["locations"]>(
    company?.locations || [],
  );
  const [initialLocations] = useState<FormFields["locations"]>(
    company?.locations || [],
  );

  // Check for changes
  const hasChanges = !arraysEqual(locations, initialLocations);

  // Helper function to compare location arrays
  function arraysEqual(a: FormFields["locations"], b: FormFields["locations"]) {
    if (a.length !== b.length) return false;
    return a.every(
      (loc, i) =>
        loc.address === b[i].address &&
        loc.city === b[i].city &&
        loc.country === b[i].country &&
        loc.primary === b[i].primary,
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) return;

    setIsSubmitting(true);
    try {
      const formData = { locations };
      const result = CompanySchema.safeParse(formData);

      if (!result.success) {
        const formattedErrors = result.error.format();
        dispatchError({
          type: "SET_ERRORS",
          payload: {
            locations: formattedErrors.locations
              ? [{ address: "", city: "", country: "", primary: false }]
              : undefined,
          },
        });
        return;
      }

      const response = await updateInfo(formData);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      dispatchError({
        type: "SET_ERRORS",
        payload: {
          locations: [
            {
              address: "Err",
              city: "",
              country: "",
              primary: false,
            },
          ],
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationChange = (updatedLocations: FormFields["locations"]) => {
    setLocations(updatedLocations);
    dispatchError({ type: "CLEAR_ERROR", payload: "locations" });
  };

  return (
    <div className="flex-1 p-6 bg-warmWhite dark:bg-darkGray">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
            Company Locations
          </h3>

          <LocationInputs
            locations={locations}
            onChange={handleLocationChange}
            errors={errors.locations}
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
