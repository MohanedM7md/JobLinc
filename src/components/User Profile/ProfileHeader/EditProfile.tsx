import { zodResolver } from "@hookform/resolvers/zod";
import { updateMe } from "@services/api/userProfileServices";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface EditProfileProps {
  user: {
    firstname: string;
    lastname: string;
    headline: string;
    country: string;
    city: string;
    phoneNumber: string;
  };
  onSave: () => void;
}

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  headline: z.string().min(1, "Headline is required"),
  country: z.string().min(1, "Country is required"), //should be a select
  city: z.string().min(1, "City is required"), //should be a select
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .or(z.literal("").optional()),
});

type ProfileFields = z.infer<typeof schema>;

function EditProfile({ user, onSave }: EditProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      headline: user.headline,
      country: user.country,
      city: user.city,
      phoneNumber: user.phoneNumber,
    },
  });
  const editUserMutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      onSave();
    },
  });

  const isPending = editUserMutation.isPending;

  const onSubmit: SubmitHandler<ProfileFields> = (data) => {
    toast.promise(editUserMutation.mutateAsync(data), {
      loading: "Saving changes...",
      success: "Saved!",
      error: (error) => error.message,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="profile-form p-4 bg-lightGray rounded-lg"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            First Name
          </label>
          <input
            type="text"
            {...register("firstname")}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastname")}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Headline
          </label>
          <textarea
            {...register("headline")}
            className="w-full px-2 py-1 border rounded-lg"
            rows={4}
            readOnly={isPending}
          />
          {errors.headline && (
            <p className="text-red-500 text-sm">{errors.headline.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-medium text-lg mb-5">Location</label>
          <br />
          <label className="text-sm font-medium text-charcoalBlack">
            Country
          </label>
          <input
            type="text"
            {...register("country")}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
          <label className="text-sm font-medium text-charcoalBlack">City</label>
          <input
            type="text"
            {...register("city")}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-3xl hover:bg-red-700 cursor-pointer transition duration-400 ease-in-out"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center">
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              Saving...
            </span>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </form>
  );
}

export default EditProfile;
