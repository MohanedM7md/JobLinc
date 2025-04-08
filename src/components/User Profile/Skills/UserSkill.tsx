import { SkillInterface } from "interfaces/userInterfaces";
import skillLevels from "@utils/skillLevels";

interface SkillProps {
  skill: SkillInterface;
}

export default function UserSkill(props: SkillProps) {
  return (
    <div className="flex flex-row mx-1">
      <div className="flex flex-col">
        <span className="font-medium -m-0.5">{props.skill.name}</span>
        <span className="text-sm -m-0.5 text-mutedSilver">
          Level: {skillLevels[props.skill.level - 1]}
        </span>
      </div>
    </div>
  );
}
