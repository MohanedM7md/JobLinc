import React from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileActions from "./ProfileActions";
import ProfileEditor from "./ProfileEditor";

const ProfileContainer: React.FC = () => {
  const handleSave = () => {
    // Implement save logic here
  };

  return (
    <div className="profile-container p-4">
      <ProfileHeader />
    </div>
  );
};

export default ProfileContainer;
