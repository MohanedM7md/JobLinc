import { ExperienceInterface } from "interfaces/userInterfaces";

interface ExperienceProps {
    experience: ExperienceInterface
}



export default function UserExperience(props:ExperienceProps) {
    return (
      <div className="flex flex-row mx-1">
        <div className="flex flex-col">
          <span className="font-medium -m-0.5">{props.experience.position}</span>
          <span className="text-sm -m-0.5 mt-0.5">{props.experience.company}</span>
          <span className="text-sm -m-0.5 text-mutedSilver">
            {props.experience.startDate.toString()}
          </span>
          <span className="text-sm my-3 -mx-0.5">{props.experience.description}</span>
        </div>
      </div>
    );
}