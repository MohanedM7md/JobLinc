import ProfileForm from "./ProfileForm ";
import Modal from "../../Authentication/Modal";
import { useState } from "react";
import { ProfileUpdateInterface } from "interfaces/userInterfaces";
import { updateCoverPicture, updateMe, updateProfilePicture } from "@services/api/userProfileServices";
import EditProfilePicture from "./EditProfilePicture";
import EditCoverPicture from "./EditCoverPicture";
import "material-icons";

interface ProfileProps {
  firstname: string;
  lastname: string;
  headline: string;
  country: string;
  city: string;
  profilePicture: string;
  coverPicture: string;
  phoneNumber: string;
  email: string;
  numberofConnections: number;
  updateUser: () => Promise<void>;
}

function ProfileHeader(props: ProfileProps) {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState<boolean>(false);
  const [isEditProfilePictureModalOpen, setIsEditProfilePictureModalOpen] =
    useState<boolean>(false);
  const [isEditCoverPictureModalOpen, setIsEditCoverPictureModalOpen] =
    useState<boolean>(false);

  async function handleUpdateUser(updatedUser: ProfileUpdateInterface) {
    await updateMe(updatedUser);
    await props.updateUser();
    setIsEditUserModalOpen(false);
  }

  async function handleUpdateProfilePicture(updatedProfilePicture: File) {
    await updateProfilePicture(updatedProfilePicture);
    await props.updateUser();
    setIsEditProfilePictureModalOpen(false);
  }

   async function handleUpdateCoverPicture(updatedCoverPicture: File) {
     await updateCoverPicture(updatedCoverPicture);
     await props.updateUser();
     setIsEditCoverPictureModalOpen(false);
   }

  return (
    <div className="profile-header bg-darkGray p-4 rounded-lg shadow-md relative">
      <div className="relative mb-16">
        <img
          src={props.coverPicture}
          alt="Cover"
          className="w-full h-80 object-cover rounded-lg"
        />
        <button
          className="material-icons-outlined hover:material-icons-round cursor-pointer absolute top-2 right-2 bg-crimsonRed hover:bg-red-800 text-white p-1 rounded-full shadow-md"
          onClick={() => setIsEditCoverPictureModalOpen(true)}
        >
          camera_alt
        </button>
        <div
          className="absolute -bottom-16 left-4 w-32 h-32 cursor-pointer"
          onClick={() => setIsEditProfilePictureModalOpen(true)}
        >
          <img
            src={props.profilePicture}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-warmWhite shadow-lg"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warmWhite">
            {props.firstname + " " + props.lastname}
          </h1>
          <p className="text-warmWhite">{props.headline}</p>
          <div className="flex flex-row">
            <p className="text-mutedSilver">
              {props.city}, {props.country}
            </p>
            <span className="text-crimsonRed font-medium cursor-pointer ml-2 hover:underline">
              Contant Info
            </span>
          </div>
          <p className="text-crimsonRed font-medium cursor-pointer hover:underline">Connections: {props.numberofConnections}</p>
        </div>
        <button
          onClick={() => setIsEditUserModalOpen(true)}
          className="material-icons text-white w-10 h-10 flex items-center justify-center hover:bg-gray-600 rounded-full cursor-pointer"
        >
          edit
        </button>
      </div>

      <div className="flex mt-4 space-x-2">
        <button className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl">
          Open to Work
        </button>
        <button className="bg-darkBurgundy text-warmWhite px-4 py-1.5 rounded-3xl">
          Add Profile Section
        </button>
        <button className="bg-darkBurgundy text-warmWhite px-4 py-1.5 rounded-3xl">
          Enhance Profile
        </button>
        <button className="bg-darkBurgundy text-warmWhite px-4 py-1.5 rounded-3xl">
          Resources
        </button>
      </div>

      <Modal
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
      >
        <ProfileForm
          user={{
            firstname: props.firstname,
            lastname: props.lastname,
            headline: props.headline,
            country: props.country,
            city: props.city,
            phoneNumber: props.phoneNumber,
          }}
          onSave={handleUpdateUser}
        />
      </Modal>

      <Modal
        isOpen={isEditProfilePictureModalOpen}
        onClose={() => setIsEditProfilePictureModalOpen(false)}
      >
        <EditProfilePicture
          profilePicture={props.profilePicture}
          onSave={handleUpdateProfilePicture}
        />
      </Modal>

      <Modal
        isOpen={isEditCoverPictureModalOpen}
        onClose={() => setIsEditCoverPictureModalOpen(false)}
      >
        <EditCoverPicture
          coverPicture={props.coverPicture}
          onSave={handleUpdateCoverPicture}
        />
      </Modal>
    </div>
  );
}

export default ProfileHeader;
