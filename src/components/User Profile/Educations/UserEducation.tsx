import { EducationInterface } from "interfaces/userInterfaces";

interface EducationProps {
  education: EducationInterface;
}

export default function UserEducation(props: EducationProps) {
  const formattedstartDate = new Date(
    props.education.startDate,
  ).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const formattedendDate = props.education.endDate
    ? new Date(props.education.endDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "No end";

  return (
    <div className="flex flex-row mx-1">
      <div className="flex flex-col">
        <span className="font-medium -m-0.5">{props.education.degree}</span>
        <span className="text-sm -m-0.5 mt-0.5">{props.education.school}</span>
        <span className="text-sm -m-0.5 mt-0.5">
          {props.education.fieldOfStudy}
        </span>
        <span className="text-sm -m-0.5 text-mutedSilver">
          {formattedstartDate} - {formattedendDate}
        </span>
        <span className="text-sm -m-0.5 text-mutedSilver">
          {props.education.CGPA}
        </span>
        <span className="text-sm my-3 -mx-0.5">
          {props.education.description}
        </span>
      </div>
    </div>
  );
}
