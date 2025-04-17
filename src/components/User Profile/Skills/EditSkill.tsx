import { useState } from "react";
import { SkillInterface } from "interfaces/userInterfaces";
import { editSkill, deleteSkill } from "@services/api/userProfileServices";
import ConfirmAction from "../../utils/ConfirmAction";
import skillLevels from "@utils/skillLevels";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../../utils/ErrorMessage";
import { AnimatePresence } from "framer-motion";

interface EditSkillProps extends SkillInterface {
  onClose: () => void;
  onUpdate: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void; 
}

export default function EditSkill(props: EditSkillProps) {
  const [name, setName] = useState<string>(props.name);
  const [level, setLevel] = useState<number>(props.level);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const editSkillMutation = useMutation({
    mutationFn: editSkill,
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

  const deleteSkillMutation = useMutation({
    mutationFn: deleteSkill,
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
    editSkillMutation.status === "pending" ||
    deleteSkillMutation.status === "pending";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const updatedSkill: SkillInterface = { id: props.id, name, level };
    editSkillMutation.mutate(updatedSkill);
  }

  function handleDelete() {
    deleteSkillMutation.mutate(props.id);
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
            disabled={isProcessing}
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
            disabled={isProcessing}
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
            disabled={isProcessing}
          >
            {editSkillMutation.status === "pending" ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700"
            onClick={() => setShowConfirmDelete(true)}
            disabled={isProcessing}
          >
            {deleteSkillMutation.status === "pending"
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </form>
      {showConfirmDelete && (
        <ConfirmAction
          action={handleDelete}
          onClose={() => setShowConfirmDelete(false)}
        />
      )}
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
