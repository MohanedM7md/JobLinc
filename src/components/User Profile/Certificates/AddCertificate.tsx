import { useEffect, useState } from "react";
import { CertificateInterface } from "interfaces/userInterfaces";
import { addCertificate } from "@services/api/userProfileServices";
import { months } from "../../../utils/months";

interface AddCertificateProps {
  onUpdate: () => void;
  onClose: () => void;
}

export default function AddCertificate(props: AddCertificateProps) {
  const [name, setName] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [issueMonth, setIssueMonth] = useState<number>(0);
  const [issueYear, setIssueYear] = useState<number>(0);
  const [expirationMonth, setExpirationMonth] = useState<number>(0);
  const [expirationYear, setExpirationYear] = useState<number>(0);
  const [dateValidation, setDateValidation] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dateValidation) {
      const newCertificate: CertificateInterface = {
        id: "",
        name,
        organization,
        issueDate: new Date(issueYear, issueMonth - 1, 1),
        expirationDate: new Date(expirationYear, expirationMonth - 1, 1),
      };
      addCertificate(newCertificate).then(() => {
        props.onUpdate();
        props.onClose();
      });
    }
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
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
