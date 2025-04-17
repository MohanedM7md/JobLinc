import { useEffect, useState } from "react";
import { months } from "../../../utils/months";
import { NewExperience } from "interfaces/userInterfaces";
import { addExperience } from "@services/api/userProfileServices";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../../../components/utils/ErrorMessage";
import { AnimatePresence } from "framer-motion";

interface AddExperienceProps {
  onUpdate: () => void;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddExperience(props: AddExperienceProps) {
  const [position, setPosition] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startMonth, setStartMonth] = useState<number>(0);
  const [startYear, setStartYear] = useState<number>(0);
  const [endMonth, setEndMonth] = useState<number>(0);
  const [endYear, setendYear] = useState<number>(0);
  const [dateValidation, setDateValidation] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const validationMessage = dateValidation
    ? ""
    : "The end date must be after the start date.";

  const addExperienceMutation = useMutation({
    mutationFn: addExperience,
    onError: async (error) => {
      setShowErrorMessage(true);
      setErrorMessage(error.message);
      setTimeout(() => setShowErrorMessage(false), 3000);
    },
    onSuccess: () => {
      props.onSuccess();
      props.onUpdate();
      props.onClose();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dateValidation) {
      const newExperience: NewExperience = {
        position: position,
        company: company,
        description: description,
        startDate: new Date(startYear, startMonth, 1),
        endDate: new Date(endYear, endMonth, 1),
      };
      addExperienceMutation.mutate(newExperience);
    }
  }

  useEffect(() => {
    if (
      startMonth !== 0 &&
      startYear !== 0 &&
      endMonth !== 0 &&
      endYear !== 0
    ) {
      if (
        startYear > endYear ||
        (startYear === endYear && startMonth > endMonth)
      ) {
        setDateValidation(false);
      } else {
        setDateValidation(true);
      }
    } else {
      setDateValidation(false);
    }
  }, [startMonth, startYear, endMonth, endYear]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-lightGray rounded-lg text-charcoalBlack"
      >
        <div className="mb-4">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            required
            disabled={addExperienceMutation.status === "pending"}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            required
            disabled={addExperienceMutation.status === "pending"}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Start Date</label>
          <div className="flex gap-2">
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
              disabled={addExperienceMutation.status === "pending"}
            >
              <option value={0}>Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
              disabled={addExperienceMutation.status === "pending"}
            >
              <option value={0}>Year</option>
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
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">End Date</label>
          <div className="flex gap-2">
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
              disabled={addExperienceMutation.status === "pending"}
            >
              <option value={0}>Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={endYear}
              onChange={(e) => setendYear(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
              disabled={addExperienceMutation.status === "pending"}
            >
              <option value={0}>Year</option>
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
          {!dateValidation && validationMessage && (
            <p className="text-sm font-medium text-red-600 mt-1">
              {validationMessage}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="headline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            rows={4}
            required
            disabled={addExperienceMutation.status === "pending"}
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700"
            disabled={addExperienceMutation.status === "pending"}
          >
            {addExperienceMutation.status === "pending" ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
      <AnimatePresence>
        {showErrorMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
            <ErrorMessage message={errorMessage} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
