import { ExperienceInterface } from "interfaces/userInterfaces";

interface ExperienceProps {
  experience: ExperienceInterface;
}

export default function UserExperience(props: ExperienceProps) {
  const formattedStartDate = new Date(
    props.experience.startDate,
  ).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const formattedEndDate = props.experience.endDate
    == "Present" ? props.experience.endDate :  new Date(props.experience.endDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    

  return (
    <div className="flex flex-row mx-1">
      <div className="flex flex-col">
        <span className="font-medium -m-0.5">{props.experience.position}</span>
        <span className="text-sm -m-0.5 mt-0.5">
          {props.experience.company}
        </span>
        <span className="text-sm -m-0.5 text-mutedSilver">
          {formattedStartDate} - {formattedEndDate}
        </span>
        <span className="text-sm -m-0.5 text-mutedSilver">
          {props.experience.type} - {props.experience.mode}
        </span>
        <span className="text-sm my-3 -mx-0.5">
          {props.experience.description}
        </span>
      </div>
    </div>
  );
}
