import React, { useState } from "react";

interface ProfilePhotoEditorProps {
  initialPhoto: string;
  onUpdatePhoto: (newPhoto: string) => void;
}

const ProfilePhotoEditor: React.FC<ProfilePhotoEditorProps> = ({
  initialPhoto,
  onUpdatePhoto,
}) => {
  const [photo, setPhoto] = useState<string>(initialPhoto);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newPhoto = URL.createObjectURL(file);
      setPhoto(newPhoto);
      onUpdatePhoto(newPhoto);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-photo-editor bg-lightGray p-4 rounded-lg shadow-md text-center">
      <div className="relative inline-block">
        <img
          src={photo}
          alt="Profile"
          className="w-48 h-48 object-cover rounded-full border-4 border-warmWhite"
        />
        <input
          type="file"
          onChange={handlePhotoUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {isEditing && (
          <div className="absolute bottom-0 right-0 bg-softRosewood text-warmWhite p-1 rounded-full">
            <button onClick={handleSaveClick}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      <button
        onClick={handleEditClick}
        className="mt-2 bg-crimsonRed text-warmWhite px-4 py-2 rounded-lg"
      >
        {isEditing ? "Cancel" : "Edit Photo"}
      </button>
    </div>
  );
};

export default ProfilePhotoEditor;
