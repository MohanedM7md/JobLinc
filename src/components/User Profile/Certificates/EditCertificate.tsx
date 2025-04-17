import { useState, useEffect } from "react";
import { CertificateInterface } from "interfaces/userInterfaces";
import {
  editCertificate,
  deleteCertificate,
} from "@services/api/userProfileServices";
import { months } from "@utils/months";
import ConfirmAction from "../../utils/ConfirmAction";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../../../components/utils/ErrorMessage";
import { AnimatePresence } from "framer-motion";

interface EditCertificateProps extends CertificateInterface {
  onClose: () => void;
  onUpdate: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
}

export default function EditCertificate(props: EditCertificateProps) {
  const [name, setName] = useState<string>(props.name);
  const [organization, setOrganization] = useState<string>(props.organization);
  const [issueMonth, setIssueMonth] = useState<number>(
    new Date(props.issueDate).getMonth() + 1,
  );
  const [issueYear, setIssueYear] = useState<number>(
    new Date(props.issueDate).getFullYear(),
  );
  const [expirationMonth, setExpirationMonth] = useState<number>(
    new Date(props.expirationDate).getMonth() + 1,
  );
  const [expirationYear, setExpirationYear] = useState<number>(
    new Date(props.expirationDate).getFullYear(),
  );
  const [dateValidation, setDateValidation] = useState<boolean>(true);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const validationMessage = dateValidation
    ? ""
    : "The expiration date must be after the issue date.";

  const editCertificateMutation = useMutation({
    mutationFn: editCertificate,
    onError: async (error) => {
      setShowErrorMessage(true);
      setErrorMessage(error.message);
      setTimeout(() => setShowErrorMessage(false), 3000);
    },
    onSuccess: () => {
      props.onEditSuccess();
      props.onUpdate();
      props.onClose();
    },
  });

  const deleteCertificateMutation = useMutation({
    mutationFn: deleteCertificate,
    onError: async (error) => {
      setShowErrorMessage(true);
      setErrorMessage(error.message);
      setTimeout(() => setShowErrorMessage(false), 3000);
    },
    onSuccess: () => {
      props.onDeleteSuccess();
      props.onUpdate();
      props.onClose();
    },
  });

  const isProcessing =
    editCertificateMutation.status === "pending" ||
    deleteCertificateMutation.status === "pending";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dateValidation) {
      const editedCertificate: CertificateInterface = {
        _id: props._id,
        name: name,
        organization: organization,
        issueDate: new Date(issueYear, issueMonth - 1, 1),
        expirationDate: new Date(expirationYear, expirationMonth - 1, 1),
      };
      editCertificateMutation.mutate(editedCertificate);
    }
  }

  async function handleDelete() {
    deleteCertificateMutation.mutate(props._id);
  }

  useEffect(() => {
    if (
      issueMonth !== 0 &&
      issueYear !== 0 &&
      expirationMonth !== 0 &&
      expirationYear !== 0
    ) {
      if (
        issueYear > expirationYear ||
        (issueYear === expirationYear && issueMonth > expirationMonth)
      ) {
        setDateValidation(false);
      } else {
        setDateValidation(true);
      }
    } else {
      setDateValidation(false);
    }
  }, [issueMonth, issueYear, expirationMonth, expirationYear]);

  return (
    <>
      {showConfirmDelete && (
        <ConfirmAction
          action={handleDelete}
          onClose={() => setShowConfirmDelete(false)}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-lightGray rounded-lg text-charcoalBlack"
      >
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Organization
          </label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Issue Date
          </label>
          <div className="flex gap-2">
            <select
              value={issueMonth}
              onChange={(e) => setIssueMonth(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
            >
              <option value={0}>Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={issueYear}
              onChange={(e) => setIssueYear(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
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
            Expiration Date
          </label>
          <div className="flex gap-2">
            <select
              value={expirationMonth}
              onChange={(e) => setExpirationMonth(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
            >
              <option value={0}>Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={expirationYear}
              onChange={(e) => setExpirationYear(Number(e.target.value))}
              className="w-1/2 px-2 py-1 border rounded-lg"
              required
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
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700"
            disabled={isProcessing}
          >
            {editCertificateMutation.status === "pending"
              ? "Saving..."
              : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setShowConfirmDelete(true)}
            className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700"
            disabled={isProcessing}
          >
            {deleteCertificateMutation.status === "pending"
              ? "Deleting..."
              : "Delete"}
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
