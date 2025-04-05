import { Camera, PenIcon } from "lucide-react";
import ProfileForm from "./ProfileForm ";
import Modal from "../../Authentication/Modal";
import { useState } from "react";

interface ProfileProps {
  firstname: string;
  lastname: string;
  headline: string;
  country: string;
  city: string;
  profilePicture: string;
}

function ProfileHeader(props: ProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSave = (updatedUser: any) => {
    console.log(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="profile-header bg-darkGray p-4 rounded-lg shadow-md relative">
      <div className="relative mb-16">
        <img
          src="https://fastly.picsum.photos/id/6/500/150.jpg?hmac=DNsBPoYhZrvLVc__YwZt4A-PY7MIPBseudP2AQzu4Is"
          alt="Cover"
          className="w-full h-52 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 bg-softRosewood text-warmWhite p-2 rounded-full">
          <Camera />
          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full inset-0 opacity-0 cursor-pointer z-10"
          />
        </div>
        <div className="absolute -bottom-16 left-4 w-32 h-32">
          <img
            src={
              props.profilePicture === ""
                ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                : props.profilePicture
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-warmWhite shadow-lg"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warmWhite">
            {props.firstname + " " + props.lastname}
          </h1>
          <p className="text-mutedSilver">{props.headline}</p>
          <p className="text-mutedSilver">
            {props.city}, {props.country}
          </p>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProfileForm user={props} onSave={handleSave} />
      </Modal>
    </div>
  );
}

export default ProfileHeader;
