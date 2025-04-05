import React, { useState } from "react";

interface ProfileFormProps {
  user: {
    firstname: string;
    lastname: string;
    headline: string;
    country: string;
    city: string;
    phoneNumber: string;
  };
  onSave: (updatedUser: any) => void;
}

function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
          />
          <label className="text-sm font-medium text-charcoalBlack">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg"
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
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-3xl hover:bg-red-700 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
