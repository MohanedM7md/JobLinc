import React, { useState } from "react";
import ProfilePhotoEditor from "./ProfilePhotoEditor";
interface UserInfo {
  name: string;
  location: string;
  headline: string;
}

const ProfileHeader: React.FC = () => {
  const [coverPhoto, setCoverPhoto] = useState<string | null>(
    "https://fastly.picsum.photos/id/6/500/150.jpg?hmac=DNsBPoYhZrvLVc__YwZt4A-PY7MIPBseudP2AQzu4Is",
  );
  const [profilePicture, setProfilePicture] = useState<string | null>(
    "https://randomuser.me/api/portraits/men/75.jpg",
  );
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Mohanned Mohamed",
    location: "Cairo, Egypt",
    headline: "USAID scholarship/Faculty of engineering/Cairo University",
  });

  const handleCoverPhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverPhoto(URL.createObjectURL(file));
    }
  };

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-header bg-lightGray p-4 rounded-lg shadow-md">
      <ProfilePhotoEditor
        initialPhoto="https://randomuser.me/api/portraits/men/75.jpg"
        onUpdatePhoto={() => {}}
      />
      <div className="relative mb-4">
        <img
          src={coverPhoto || ""}
          alt="Cover"
          className="w-full h-52 object-cover rounded-lg"
        />
        <input
          type="file"
          onChange={handleCoverPhotoUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <button className="absolute bottom-2 right-2 bg-softRosewood text-warmWhite p-2 rounded-full">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative">
          <img
            src={profilePicture || ""}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-warmWhite"
          />
          <input
            type="file"
            onChange={handleProfilePictureUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <button className="absolute bottom-0 right-0 bg-softRosewood text-warmWhite p-1 rounded-full">
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-charcoalBlack">
            {userInfo.name}
          </h1>
          <p className="text-mutedSilver">{userInfo.location}</p>
          <p className="text-mutedSilver">{userInfo.headline}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-4">
        <button className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-lg">
          Open to Work
        </button>
        <button className="bg-darkBurgundy text-warmWhite px-4 py-2 rounded-lg">
          Resources
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
