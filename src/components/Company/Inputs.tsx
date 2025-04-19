import { ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { Location } from "./interfaces/inputs.interface";
import axios from "axios";
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const ChevronDownIcon = () => (
  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
    <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
  </span>
);

export const Input = ({
  icon,
  label,
  value,
  onChange,
  error,
  prefix,
  placeholder,
  loading = false,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: any;
  prefix?: string;
  placeholder?: string;
  loading?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-charcoalBlack dark:text-charcoalWhite mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <div className="flex items-center">
        {prefix && (
          <span className="mr-2 text-gray-500 dark:text-gray-400">
            {prefix}
          </span>
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 rounded-md border ${
            error ? "border-crimsonRed" : "border-gray-300 dark:border-darkGray"
          } bg-lightGray dark:bg-warmBlack text-charcoalBlack dark:text-charcoalWhite focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:border-transparent`}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        )}
        {!loading && !error && value && label == "Company URL" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            ✓
          </div>
        )}
        {!loading && error && value && label == "Company URL" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            This slug is already exist
          </div>
        )}
      </div>
    </div>
    {error && (
      <p className="text-crimsonRed text-sm mt-1">
        {error._errors?.toString()}
      </p>
    )}
  </div>
);

export const Select = ({
  icon,
  label,
  options,
  selected,
  onSelect,
  error,
}: {
  icon?: React.ReactNode;
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  error?: any;
}) => (
  <div>
    <label className="block text-sm font-medium text-charcoalBlack dark:text-charcoalWhite mb-1">
      {label}
    </label>
    <Listbox value={selected} onChange={onSelect}>
      <div className="relative">
        <Listbox.Button className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-darkGray bg-lightGray dark:bg-warmBlack text-left text-charcoalBlack dark:text-charcoalWhite focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:border-transparent flex items-center">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}
          <span className="block truncate">
            {selected || `Select ${label.toLowerCase()}`}
          </span>
          <ChevronDownIcon />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-full bg-lightGray dark:bg-warmBlack shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none max-h-60">
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `${
                  active ? "bg-SoftRed dark:bg-darkGray" : ""
                } cursor-default select-none relative py-2 pl-10 pr-4 text-charcoalBlack dark:text-charcoalWhite`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                  >
                    {option}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
    {error && (
      <p className="text-crimsonRed text-sm mt-1">
        {error._errors?.toString()}
      </p>
    )}
  </div>
);

export const FileUploadIcon = ({
  icon,
  accept,
  onChange,
  error,
}: {
  icon?: React.ReactNode;
  accept: string;
  onChange: (url: string | null) => void; // Now returns URL instead of File
  description?: string;
  error?: any;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      onChange(null);
      return;
    }

    setIsUploading(true);

    try {
      const url = await uploadFile(file);
      console.log("El URL", url);
      onChange(url);
    } catch (err) {
      console.error("Upload failed:", err);
      onChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        {icon && (
          <button
            type="button"
            onClick={() => document.getElementById("file-upload")?.click()}
            className="cursor-pointer"
          >
            {icon}
          </button>
        )}
        <input
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </div>
      {isUploading && (
        <p className="mt-1 text-sm text-gray-500">Uploading...</p>
      )}
      {error && (
        <p className="text-crimsonRed text-sm mt-1">
          {error._errors?.toString()}
        </p>
      )}
    </div>
  );
};

export const FileUpload = ({
  label,
  accept,
  onChange,
  description,
  error,
}: {
  label: string;
  accept: string;
  onChange: (url: string | null) => void; // Now returns URL instead of File
  description?: string;
  error?: any;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      onChange(null);
      return;
    }

    setIsUploading(true);

    try {
      const url = await uploadFile(file);
      console.log("El URL", url);
      onChange(url);
    } catch (err) {
      console.error("Upload failed:", err);
      onChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-charcoalBlack dark:text-charcoalWhite mb-1">
        {label}
      </label>
      <div className="flex items-center">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-crimsonRed file:text-white hover:file:bg-darkBurgundy disabled:opacity-50"
        />
      </div>
      {isUploading && (
        <p className="mt-1 text-sm text-gray-500">Uploading...</p>
      )}
      {description && !isUploading && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      {error && (
        <p className="text-crimsonRed text-sm mt-1">
          {error._errors?.toString()}
        </p>
      )}
    </div>
  );
};

const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.get(
    "https://run.mocky.io/v3/06451b01-26e1-4b21-9721-01762c680766",
  );

  const data = await response.data;

  return data.url;
};

export const TextArea = ({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: any;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-charcoalBlack dark:text-charcoalWhite mb-1">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={`w-full px-3 py-2 rounded-md border ${
        error ? "border-crimsonRed" : "border-gray-300 dark:border-darkGray"
      } bg-lightGray dark:bg-warmBlack text-charcoalBlack dark:text-charcoalWhite focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:border-transparent`}
    />
    {error && (
      <p className="text-crimsonRed text-sm mt-1">
        {error._errors?.toString()}
      </p>
    )}
  </div>
);
export const DateInput = ({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  error?: any;
}) => (
  <div>
    <label className="block text-sm font-medium text-charcoalBlack dark:text-charcoalWhite mb-1">
      {label}
    </label>
    <input
      type="date"
      value={value ? value.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        const dateValue = e.target.value ? new Date(e.target.value) : null;
        onChange(dateValue);
      }}
      className={`w-full px-3 py-2 rounded-md border ${
        error ? "border-crimsonRed" : "border-gray-300 dark:border-darkGray"
      } bg-lightGray dark:bg-warmBlack text-charcoalBlack dark:text-charcoalWhite focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:border-transparent`}
    />
    {error && (
      <p className="text-crimsonRed text-sm mt-1">
        {error._errors?.toString()}
      </p>
    )}
  </div>
);
export const LocationInputs = ({
  locations,
  onChange,
  errors,
}: {
  locations: Location[];
  onChange: (updatedLocations: typeof locations) => void;
  errors?: Array<{ address?: string; city?: string; country?: string }>;
}) => {
  const [expandedLocation, setExpandedLocation] = useState<number | null>(null);

  const handleLocationChange = (
    index: number,
    field: keyof Location[][0],
    value: string | boolean,
  ) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = {
      ...updatedLocations[index],
      [field]: value,
    };

    // If setting as primary, ensure no other locations are primary
    if (field === "primary" && value === true) {
      updatedLocations.forEach((loc, i) => {
        if (i !== index) loc.primary = false;
      });
    }

    onChange(updatedLocations);
  };

  const addLocation = () => {
    const newLocation = {
      address: "",
      city: "",
      country: "",
      primary: locations.length === 0,
    };
    onChange([...locations, newLocation]);
    setExpandedLocation(locations.length);
  };

  const removeLocation = (index: number) => {
    const wasPrimary = locations[index].primary;
    const updatedLocations = locations.filter((_, i) => i !== index);

    // If we removed the primary location, set the first one as primary
    if (wasPrimary && updatedLocations.length > 0) {
      updatedLocations[0].primary = true;
    }

    onChange(updatedLocations);
    setExpandedLocation(null);
  };

  const toggleExpand = (index: number) => {
    setExpandedLocation(expandedLocation === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {locations.map((location, index) => (
        <div
          key={index}
          className={`border rounded-lg overflow-hidden ${
            location.primary ? "border-crimsonRed" : "border-gray-200"
          }`}
        >
          <div
            className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleExpand(index)}
          >
            <div className="flex items-center">
              {location.primary && (
                <span className="bg-crimsonRed text-white text-xs px-2 py-1 rounded mr-2">
                  Primary
                </span>
              )}
              <span className="font-medium">
                {location.address || `Location ${index + 1}`}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeLocation(index);
                }}
                className="text-gray-500 hover:text-crimsonRed text-sm"
              >
                Remove
              </button>
            </div>
          </div>

          {expandedLocation === index && (
            <div className="p-4 space-y-3 border-t">
              <Input
                label="Address"
                value={location.address}
                onChange={(value) =>
                  handleLocationChange(index, "address", value)
                }
                error={errors?.[index]?.address}
                placeholder="Street address, P.O. box, etc."
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={location.city}
                  onChange={(value) =>
                    handleLocationChange(index, "city", value)
                  }
                  error={errors?.[index]?.city}
                />
                <Input
                  label="Country"
                  value={location.country}
                  onChange={(value) =>
                    handleLocationChange(index, "country", value)
                  }
                  error={errors?.[index]?.country}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`primary-${index}`}
                  checked={location.primary || false}
                  onChange={(e) =>
                    handleLocationChange(index, "primary", e.target.checked)
                  }
                  className="mr-2 h-4 w-4 text-crimsonRed focus:ring-crimsonRed border-gray-300 rounded"
                />
                <label
                  htmlFor={`primary-${index}`}
                  className="text-sm text-gray-700"
                >
                  Set as primary location
                </label>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addLocation}
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-crimsonRed hover:bg-darkBurgundy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimsonRed"
      >
        Add Location
      </button>
    </div>
  );
};
