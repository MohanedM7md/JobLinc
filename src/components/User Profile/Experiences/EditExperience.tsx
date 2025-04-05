import { useEffect, useState } from "react";
import { months } from "../../../utils/months";
import { ExperienceInterface } from "interfaces/userInterfaces";
import { editExperience } from "@services/api/userProfileServices";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dateValidation) {
      const editedExperience: ExperienceInterface = {
        id: props.id,
        position: position,
        company: company,
        description: description,
        startDate: new Date(startYear, startMonth, 1),
        endDate: new Date(endYear, endMonth, 1),
      };
      await editExperience(editedExperience);
      props.onUpdate();
      props.onClose();
    }
  }

  useEffect(() => {
    if (
      startMonth !== 0 &&
      startYear !== 0 &&
      endMonth !== 0 &&
      endYear !== 0
    ) {
      if (startYear > endYear) {
        setDateValidation(false);
      } else if (startYear === endYear && startMonth > startYear) {
        setDateValidation(false);
      } else {
        setDateValidation(true);
      }
    } else {
      setDateValidation(false);
    }
  }, [startMonth, startYear, endMonth, endYear]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-lightGray rounded-lg text-charcoalBlack"
    >
      <div className="mb-4">
        <label className="text-sm font-medium text-charcoalBlack">Title</label>
        <input
          type="text"
          name="title"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full px-2 py-1 border rounded-lg"
          required
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
          Description
        </label>
        <textarea
          name="headline"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border rounded-lg"
          rows={4}
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
