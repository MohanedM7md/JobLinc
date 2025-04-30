import { NewSkill } from "interfaces/userInterfaces";
import { addSkill } from "@services/api/userProfileServices";
import skillLevels from "@utils/skillLevels";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddSkillProps {
  onUpdate: () => void;
  onClose: () => void;
}

const schema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.coerce
    .number()
    .min(1, "Invalid skill level")
    .max(5, "Invalid skill level"),
});

type SkillFields = z.infer<typeof schema>;

export default function AddSkill(props: AddSkillProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFields>({
    resolver: zodResolver(schema),
  });

  const addSkillMutation = useMutation({
    mutationFn: addSkill,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const onSubmit: SubmitHandler<SkillFields> = (data) => {
    const newSkill: NewSkill = { name: data.name, level: data.level };
    toast.promise(addSkillMutation.mutateAsync(newSkill), {
      loading: "Adding skill...",
      success: "Skill added successfully!",
      error: (error) => error.message,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 rounded-lg"
      >
        <div className="mb-4">
          <label className="text-sm font-medium">
            Skill Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-2 py-1 border rounded-lg"
            disabled={addSkillMutation.status === "pending"}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">
            Skill Level
          </label>
          <select
            {...register("level")}
            className="w-full px-2 py-1 border rounded-lg"
            disabled={addSkillMutation.status === "pending"}
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
            disabled={addSkillMutation.status === "pending"}
          >
            {addSkillMutation.status === "pending" ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
