import React from "react";

const ProfileActions: React.FC = () => {
  return (
    <div className="profile-actions flex justify-between mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
        Open to Work
      </button>
      <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
        Resources
      </button>
    </div>
  );
};

export default ProfileActions;
