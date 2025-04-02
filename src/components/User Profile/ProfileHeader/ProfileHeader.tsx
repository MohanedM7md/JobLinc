import React, { useReducer, useState } from "react";
import { Camera, PenIcon } from "lucide-react";
import ProfileForm from "./ProfileForm "; // Import the ProfileForm component

interface UserInfo {
  name: string;
  location: string;
  headline: string;
}

interface State {
  coverPhoto: string;
  profilePicture: string;
  userInfo: UserInfo;
}

interface Action {
  type: "UPDATE_COVER_PHOTO" | "UPDATE_PROFILE_PICTURE";
  payload: string;
}

const initialState: State = {
  coverPhoto:
    "https://fastly.picsum.photos/id/6/500/150.jpg?hmac=DNsBPoYhZrvLVc__YwZt4A-PY7MIPBseudP2AQzu4Is",
  profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
  userInfo: {
    name: "Mohanned Mohamed",
    location: "Cairo, Egypt",
    headline: "USAID scholarship/Faculty of Engineering/Cairo University",
  },
};

const mockUserData = {
  firstname: "Mohanned",
  lastname: "Mohamed",
  bio: "USAID scholarship/Faculty of Engineering/Cairo University",
  location: "Cairo, Egypt",
  workExperience: [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      startYear: 2018,
      endYear: 2021,
      description: "Developed web applications.",
    },
  ],
  education: [
    {
      school: "Cairo University",
      degree: "Bachelor's",
      fieldOfStudy: "Engineering",
      startYear: 2014,
      endYear: 2018,
    },
  ],
  skills: [{ name: "JavaScript" }, { name: "React" }],
  industry: "Technology",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_COVER_PHOTO":
      return { ...state, coverPhoto: action.payload };
    case "UPDATE_PROFILE_PICTURE":
      return { ...state, profilePicture: action.payload };
    default:
      return state;
  }
}

const ProfileHeader: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "UPDATE_COVER_PHOTO" | "UPDATE_PROFILE_PICTURE",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      dispatch({ type, payload: url });
    }
  };

  const handleSave = (updatedUser: any) => {
    // Handle saving the updated user info
    console.log(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="profile-header bg-darkGray p-4 rounded-lg shadow-md relative">
      <div className="relative mb-16">
        <img
          src={state.coverPhoto}
          alt="Cover"
          className="w-full h-52 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 bg-softRosewood text-warmWhite p-2 rounded-full">
          <Camera />
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "UPDATE_COVER_PHOTO")}
            className="absolute w-full h-full inset-0 opacity-0 cursor-pointer z-10"
          />
        </div>
        <div className="absolute -bottom-16 left-4 w-32 h-32">
          <img
            src={state.profilePicture}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-warmWhite shadow-lg"
          />
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "UPDATE_PROFILE_PICTURE")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warmWhite">
            {state.userInfo.name}
          </h1>
          <p className="text-mutedSilver">{state.userInfo.headline}</p>
          <p className="text-mutedSilver">{state.userInfo.location}</p>
        </div>
        <div
          className="text-white w-8 h-8 flex items-center justify-center bg-crimsonRed rounded-full cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <PenIcon />
        </div>
      </div>

      <div className="flex mt-4 space-x-2">
        <button className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-lg">
          Open to Work
        </button>
        <button className="bg-darkBurgundy text-warmWhite px-4 py-2 rounded-lg">
          Add Profile Section
        </button>
        <button className="bg-darkBurgundy text-warmWhite px-4 py-2 rounded-lg">
          Enhance Profile
        </button>
        <button className="bg-darkBurgundy text-warmWhite px-4 py-2 rounded-lg">
          Resources
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center ">
          <div className="bg-white p-4 rounded-lg shadow-lg h-[90vh] overflow-auto">
            <ProfileForm
              user={mockUserData}
              onSave={handleSave}
              close={isModalOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
