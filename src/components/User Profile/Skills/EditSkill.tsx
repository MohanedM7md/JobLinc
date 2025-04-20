import { useState } from "react";
import { SkillInterface } from "interfaces/userInterfaces";
import { editSkill, deleteSkill } from "@services/api/userProfileServices";
import ConfirmAction from "../../utils/ConfirmAction";
import skillLevels from "@utils/skillLevels";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

interface EditSkillProps extends SkillInterface {
  onClose: () => void;
  onUpdate: () => void;
}

const schema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.coerce
    .number()
    .min(1, "Invalid skill level")
    .max(5, "Invalid skill level"),
});

type SkillFields = z.infer<typeof schema>;

export default function EditSkill(props: EditSkillProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.name,
      level: props.level,
    },
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const editSkillMutation = useMutation({
    mutationFn: editSkill,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const isProcessing =
    editSkillMutation.status === "pending" ||
    deleteSkillMutation.status === "pending";

  const onSubmit: SubmitHandler<SkillFields> = (data) => {
    const updatedSkill: SkillInterface = {
      id: props.id,
      name: data.name,
      level: data.level,
    };
    toast.promise(editSkillMutation.mutateAsync(updatedSkill), {
      loading: "Saving skill...",
      success: "Skill updated successfully!",
      error: (error) => error.message,
    });
  };

  function handleDelete() {
    toast.promise(deleteSkillMutation.mutateAsync(props.id), {
      loading: "Deleting skill...",
      success: "Skill deleted successfully!",
      error: (error) => error.message,
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-lightGray rounded-lg text-charcoalBlack"
      >
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Skill Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-2 py-1 border rounded-lg"
            disabled={isProcessing}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Skill Level
          </label>
          <select
            {...register("level")}
            className="w-full px-2 py-1 border rounded-lg"
            disabled={isProcessing}
          >
            {skillLevels.map((levelName, index) => (
              <option key={index} value={index + 1}>
                {levelName}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm">{errors.level.message}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
            disabled={isProcessing}
          >
            {editSkillMutation.status === "pending" ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700 transition duration-400 ease-in-out"
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
    </>
  );
}
