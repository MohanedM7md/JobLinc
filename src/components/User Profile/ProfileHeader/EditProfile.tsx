import { updateMe } from "@services/api/userProfileServices";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

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

function EditProfile({ user, onSave }: EditProfileProps) {
  const [formData, setFormData] = useState({ ...user });
  
  const editUserMutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      onSave();
    },
  });
  
  const isPending = editUserMutation.isPending;
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(editUserMutation.mutateAsync(formData), {
      loading: "Saving changes...",
      success: "Saved changes!",
      error: (error) => error.message,
    });
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form p-4 bg-lightGray rounded-lg"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
            required
            readOnly={isPending}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
            required
            readOnly={isPending}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Headline
          </label>
          <textarea
            name="headline"
            value={formData.headline}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
            rows={4}
            readOnly={isPending}
          />
        </div>

        <div className="mb-4">
          <label className="font-medium text-lg mb-5">Location</label>
          <br />
          <label className="text-sm font-medium text-charcoalBlack">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
          <label className="text-sm font-medium text-charcoalBlack">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Phone Number
          </label>
          <input
            type="text"
            name="phonenumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-charcoalBlack">
            Industry
          </label>
          <input
            type="text"
            name="industry"
            value="Not sent by backend as of now"
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
            readOnly={isPending}
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-3xl hover:bg-red-700 cursor-pointer transition duration-400 ease-in-out"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

export default EditProfile;
