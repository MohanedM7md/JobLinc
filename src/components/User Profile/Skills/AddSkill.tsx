import { useState } from "react";
import { NewSkill } from "interfaces/userInterfaces";
import { addSkill } from "@services/api/userProfileServices";
import skillLevels from "@utils/skillLevels";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AddSkillProps {
  onUpdate: () => void;
  onClose: () => void;
}

export default function AddSkill(props: AddSkillProps) {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<number>(1);

  const addSkillMutation = useMutation({
    mutationFn: addSkill,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newSkill: NewSkill = { name, level };
    toast.promise(addSkillMutation.mutateAsync(newSkill),{
      loading: "Adding skill...",
      success: "Skill added successfully!",
      error: (error) => error.message,
    })
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
            disabled={addSkillMutation.status === "pending"}
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
            disabled={addSkillMutation.status === "pending"}
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
            disabled={addSkillMutation.status === "pending"}
          >
            {addSkillMutation.status === "pending" ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
