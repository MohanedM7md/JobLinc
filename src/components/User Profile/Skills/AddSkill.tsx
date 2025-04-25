import { useState } from "react";
import { NewSkill } from "interfaces/userInterfaces";
import { addSkill } from "@services/api/userProfileServices";
import skillLevels from "@utils/skillLevels";

interface AddSkillProps {
  onUpdate: () => void;
  onClose: () => void;
}

export default function AddSkill(props: AddSkillProps) {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<number>(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newSkill: NewSkill = { name, level };
    addSkill(newSkill).then(() => {
      props.onUpdate();
      props.onClose();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-lightGray rounded-lg text-charcoalBlack"
    >
      <div className="mb-4">
        <label className="text-sm font-medium text-charcoalBlack">
          Skill Name
        </label>
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
          Skill Level
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full px-2 py-1 border rounded-lg"
          required
        >
          {skillLevels.map((levelName, index) => (
            <option key={index} value={index + 1}>
              {levelName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
