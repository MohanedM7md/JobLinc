import React, { useState } from "react";

const ProfileHeader = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "Mohanned Mohamed",
    location: "Cairo, Egypt",
    headline: "USAID scholarship/Faculty of engineering/Cairo University",
  });

  const handleCoverPhotoUpload = (event) => {
    setCoverPhoto(URL.createObjectURL(event.target.files[0]));
  };

  const handleProfilePictureUpload = (event) => {
    setProfilePicture(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="profile-header">
      <div className="cover-photo">
        <img src={coverPhoto} alt="Cover" />
        <input type="file" onChange={handleCoverPhotoUpload} />
      </div>
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
        <input type="file" onChange={handleProfilePictureUpload} />
      </div>
      <div className="user-info">
        <h1>{userInfo.name}</h1>
        <p>{userInfo.location}</p>
        <p>{userInfo.headline}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
