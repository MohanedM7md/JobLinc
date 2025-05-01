import EditProfile from "./EditProfile";
import Modal from "../../utils/Modal";
import { useEffect, useState } from "react";
import EditProfilePicture from "./EditProfilePicture";
import EditCoverPicture from "./EditCoverPicture";
import "material-icons";
import { useNavigate } from "react-router-dom";
import { ConnectionStatus } from "../../../interfaces/userInterfaces";

interface ProfileProps {
  userId: string;
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
  mutualConnections: number;
  connectionStatus: ConnectionStatus
  updateUser: () => Promise<void>;
}

function ProfileHeader(props: ProfileProps & { isUser: boolean }) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(props.connectionStatus);
  const [connectionButtonText, setConnectionButtonText] = useState<string>("");
  const [connectionButtonStyle, setConnectionButtonStyle] = useState<string>("");
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);
  const [isEditProfilePictureModalOpen, setIsEditProfilePictureModalOpen] =
    useState<boolean>(false);
  const [isEditCoverPictureModalOpen, setIsEditCoverPictureModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  async function handleUpdateUser() {
    await props.updateUser();
    setIsEditUserModalOpen(false);
  }

  async function handleUpdateProfilePicture() {
    await props.updateUser();
    setIsEditProfilePictureModalOpen(false);
  }

  async function handleUpdateCoverPicture() {
    await props.updateUser();
    setIsEditCoverPictureModalOpen(false);
  }

  useEffect(() => {
    switch (props.connectionStatus) {
      case ConnectionStatus.NotConnected: {
        setConnectionButtonText("Send Message Req");
        setConnectionButtonStyle(
          "border-crimsonRed hover:bg-crimsonRed hover:text-white",
        );
      }
      //make cases for each one with your preferred styling and text
    }
  }, [connectionStatus])

  const handleConnectionsClick = () => {
    navigate(`/profile/${props.userId}/connections`);
  }

  return (
    <div className="profile-header bg-lightGray p-4 rounded-lg shadow-md relative">
      <div className="relative mb-16">
        <img
          src={props.coverPicture}
          alt="Cover"
          className="w-full h-80 object-cover rounded-lg"
        />
        {props.isUser && (
          <button
            className="material-icons-outlined hover:material-icons-round cursor-pointer absolute top-2 right-2 bg-crimsonRed hover:bg-red-800 text-white p-1 rounded-full shadow-md transition duration-400 ease-in-out"
            onClick={() => setIsEditCoverPictureModalOpen(true)}
          >
            camera_alt
          </button>
        )}
        <div
          className={`absolute -bottom-16 left-4 w-32 h-32 ${
            props.isUser ? "cursor-pointer" : ""
          }`}
          onClick={() => props.isUser && setIsEditProfilePictureModalOpen(true)}
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
          <h1 className="text-2xl font-bold">
            {props.firstname + " " + props.lastname}
          </h1>
          <p>{props.headline}</p>
          <div className="flex flex-row">
            <p className="text-mutedSilver">
              {props.city}, {props.country}
            </p>
            <span className="text-crimsonRed font-medium cursor-pointer ml-2 hover:underline">
              Contact Info
            </span>
          </div>
          <p
            className="text-crimsonRed font-medium cursor-pointer hover:underline"
            onClick={handleConnectionsClick}
          >
            Connections: {props.numberofConnections}
          </p>
          <p
            className="text-crimsonRed font-medium cursor-pointer hover:underline"
            onClick={handleConnectionsClick}
          >
            Mutuals: {props.mutualConnections}
          </p>
        </div>
        {props.isUser && (
          <button
            onClick={() => setIsEditUserModalOpen(true)}
            className="material-icons w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer transition duration-400 ease-in-out"
          >
            edit
          </button>
        )}
      </div>

      {props.isUser && (
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
      )}
      {!props.isUser && (
        <div className="flex mt-4 space-x-2">
          <button
            className={`mt-2 px-4 py-1.5 border-1 rounded-3xl font-medium transition duration-300 ease-in-out ${connectionButtonStyle}`}
          >
            {connectionButtonText}
          </button>
        </div>
      )}

      <Modal
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
      >
        <EditProfile
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
