import { useState } from "react";
import { SkillInterface } from "interfaces/userInterfaces";
import { editSkill, deleteSkill } from "@services/api/userProfileServices";
import ConfirmAction from "../../utils/ConfirmAction";
import skillLevels from "@utils/skillLevels";

interface EditSkillProps extends SkillInterface {
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditSkill(props: EditSkillProps) {
  const [name, setName] = useState<string>(props.name);
  const [level, setLevel] = useState<number>(props.level);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const updatedSkill: SkillInterface = { id: props.id, name, level };
    await editSkill(updatedSkill);
    props.onUpdate();
    props.onClose();
  }

  async function handleDelete() {
    await deleteSkill(props.id);
    props.onUpdate();
    props.onClose();
  }

  return (
    <>
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
            Save
          </button>
          <button
            type="button"
            className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700"
            onClick={() => setShowConfirmDelete(true)}
          >
            Delete
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
