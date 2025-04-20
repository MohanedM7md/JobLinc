import { useEffect, useState } from "react";
import { months } from "../../../utils/months";
import { ExperienceInterface } from "interfaces/userInterfaces";
import {
  deleteExperience,
  editExperience,
} from "@services/api/userProfileServices";
import ConfirmAction from "../../utils/ConfirmAction";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface EditExperienceProps extends ExperienceInterface {
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditExperience(props: EditExperienceProps) {
  const [position, setPosition] = useState<string>(props.position);
  const [company, setCompany] = useState<string>(props.company);
  const [description, setDescription] = useState<string>(props.description);
  const [startMonth, setStartMonth] = useState<number>(
    new Date(props.startDate).getMonth() + 1,
  );
  const [startYear, setStartYear] = useState<number>(
    new Date(props.startDate).getFullYear(),
  );
  const [endMonth, setEndMonth] = useState<number>(
    new Date(props.endDate).getMonth() + 1,
  );
  const [endYear, setendYear] = useState<number>(
    new Date(props.endDate).getFullYear(),
  );
  const [dateValidation, setDateValidation] = useState<boolean>(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const validationMessage = dateValidation
    ? ""
    : "The end date must be after the start date.";

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dateValidation) {
      const editedExperience: ExperienceInterface = {
        _id: props._id,
        position: position,
        company: company,
        description: description,
        startDate: new Date(startYear, startMonth - 1, 1),
        endDate: new Date(endYear, endMonth - 1, 1),
      };
      toast.promise(editExperienceMutation.mutateAsync(editedExperience), {
        loading: "Saving experience...",
        success: "Experience edited successfully",
        error: (error) => error.message,
      })
    }
  }

  function handleDelete() {
    toast.promise(deleteExperienceMutation.mutateAsync(props._id), {
      loading: "Deleting experience...",
      success: "Experience deleted successfully",
      error: (error) => error.message,
    })
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
          <label className="text-sm font-medium text-charcoalBlack">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            required
            disabled={isProcessing}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            required
            disabled={isProcessing}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Start Date
          </label>
          <div className="flex gap-2">
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
              disabled={isProcessing}
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
              disabled={isProcessing}
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
          <label className="text-sm font-medium text-charcoalBlack">
            End Date
          </label>
          <div className="flex gap-2">
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
              disabled={isProcessing}
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
              disabled={isProcessing}
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
          <label className="text-sm font-medium text-charcoalBlack">
            Description
          </label>
          <textarea
            name="headline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            rows={4}
            required
            disabled={isProcessing}
          />
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
