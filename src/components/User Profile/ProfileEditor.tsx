import React, { useState } from "react";

interface ProfileEditorProps {
  onSave: () => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave();
  };

  return (
    <div className="profile-editor mt-4">
      {isEditing ? (
        <button
          onClick={handleSaveClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      ) : (
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default ProfileEditor;
