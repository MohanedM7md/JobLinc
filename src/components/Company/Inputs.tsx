import {
  Building2,
  Briefcase,
  Users,
  Globe,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Listbox } from "@headlessui/react";

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

export const FileUpload = ({
  label,
  accept,
  onChange,
  description,
  error,
}: {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
  description?: string;
  error?: any;
}) => (
  <div>
    <label className="block text-sm font-medium text-charcoalBlack dark:text-charcoalWhite mb-1">
      {label}
    </label>
    <div className="flex items-center">
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-crimsonRed file:text-white hover:file:bg-darkBurgundy"
      />
    </div>
    {description && (
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
