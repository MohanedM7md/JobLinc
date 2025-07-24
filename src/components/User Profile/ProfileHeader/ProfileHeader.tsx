import EditProfile from "./EditProfile";
import Modal from "../../utils/Modal";
import { useEffect, useState } from "react";
import EditProfilePicture from "./EditProfilePicture";
import EditCoverPicture from "./EditCoverPicture";
import "material-icons";
import { useNavigate } from "react-router-dom";
import { ConnectionStatus } from "../../../interfaces/userInterfaces";
import useChats from "@hooks/useChats";
import ProfileUtilityButton from "./ProfileUtilityButton";
import {
  AcceptConnectionRequest,
  changeConnectionStatus,
  sendConnectionRequest,
} from "@services/api/networkServices";
import toast from "react-hot-toast";
import NetworkModal from "@components/MyNetwork/NetworkModal";
import ContactInfo from "./ContactInfo";

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
  numberOfConnections: number;
  mutualConnections: number;
  connectionStatus: ConnectionStatus;
  isFollowing: boolean;
  updateUser: () => Promise<void>;
}

function ProfileHeader(props: ProfileProps & { isUser: boolean }) {
  const { setOpnedChats } = useChats();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    props.connectionStatus,
  );
  const [connectionButtonText, setConnectionButtonText] = useState<string>("");
  const [messageButtonText, setMessageButtonText] = useState<string>("");
  const [connectionButtonStyle, setConnectionButtonStyle] =
    useState<string>("");
  const [showConnectionButton, setShowConnectionButton] =
    useState<boolean>(false);
  const [showIgnoreButton, setShowIgnoreButton] = useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);
  const [isEditProfilePictureModalOpen, setIsEditProfilePictureModalOpen] =
    useState<boolean>(false);
  const [isEditCoverPictureModalOpen, setIsEditCoverPictureModalOpen] =
    useState<boolean>(false);
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
    switch (connectionStatus) {
      case ConnectionStatus.NotConnected: {
        setConnectionButtonText("Connect");
        setMessageButtonText("Send Message Request");
        setConnectionButtonStyle(
          "border-crimsonRed hover:bg-crimsonRed hover:text-white",
        );
        setShowConnectionButton(true);
        break;
      }
      case ConnectionStatus.Pending: {
        setConnectionButtonText("Pending");
        setMessageButtonText("Send Message Request");
        setConnectionButtonStyle(
          "border-gray-400 hover:bg-gray-200 text-gray-400",
        );
        setShowConnectionButton(true);
        break;
      }
      case ConnectionStatus.Sent: {
        setConnectionButtonText("Pending");
        setMessageButtonText("Send Message Request");
        setConnectionButtonStyle(
          "border-gray-400 hover:bg-gray-200 text-gray-400",
        );
        setShowConnectionButton(true);
        break;
      }
      case ConnectionStatus.Received: {
        setConnectionButtonText("Accept");
        setMessageButtonText("Send Message Request");
        setConnectionButtonStyle(
          "border-crimsonRed hover:bg-crimsonRed hover:text-white",
        );
        setShowConnectionButton(true);
        setShowIgnoreButton(true);
        break;
      }
      case ConnectionStatus.Blocked: {
        setShowConnectionButton(false);
        break;
      }
      case ConnectionStatus.Accepted: {
        setConnectionButtonText("Remove Connection");
        setMessageButtonText("Message");
        setConnectionButtonStyle(
          "border-gray-400 hover:bg-gray-200 text-gray-400",
        );
        setShowConnectionButton(true);
        break;
      }
      default: {
        setConnectionButtonText("Connect");
        setMessageButtonText("Send Message Request");
        setConnectionButtonStyle(
          "border-crimsonRed hover:bg-crimsonRed hover:text-white",
        );
        setShowConnectionButton(true);
        break;
      }
    }
  }, [connectionStatus]);

  const handleConnectionsClick = () => {
    if (props.isUser) {
      navigate(`/my-connections`);
    } else {
      navigate(`/profile/${props.userId}/connections`);
    }
  };
  const handleMutualsClick = () => {
    navigate(`/profile/${props.userId}/mutual-connections`);
  };
  const handleAssuringModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleIgnoreClick = () => {
    const removeconnectionpromise = changeConnectionStatus(
      props.userId,
      "Canceled",
    );
    removeconnectionpromise
      .then((response) => {
        toast.promise(removeconnectionpromise, {
          loading: "Rejecting Connection...",
          success: "User rejected successfully!",
          error: "Failed to Reject user. Please try again.",
        });
        if (response.status === 200) {
          console.log("Reject Connection Response:", response);
          setConnectionStatus(ConnectionStatus.Rejected);
          setShowIgnoreButton(false);
        } else {
          console.error("Failed to Remove user:", response);
        }
      })
      .catch((error) => {
        console.error("Error Removing user:", error);
      });
  };
  const handleConnectClick = async () => {
    if (
      connectionStatus === ConnectionStatus.Pending ||
      connectionStatus === ConnectionStatus.Sent
    ) {
      handleAssuringModal();
    } else if (connectionStatus === ConnectionStatus.Received) {
      const AcceptPromise = AcceptConnectionRequest(props.userId);
      toast.promise(AcceptPromise, {
        loading: `Accepting Invitation...`,
        success: `${props.firstname} ${props.lastname} is now a connection!`,
        error: "Failed to Accept Invitation. Please try again.",
      });
      try {
        const response = await AcceptPromise;
        if (response.status === 200) {
          console.log("Accept invitation response", response);
          setConnectionStatus(ConnectionStatus.Accepted);
        }
      } catch (err) {
        console.error("Failed to accept connection request:", err);
      }
    } else if (connectionStatus === ConnectionStatus.Blocked) {
      setShowConnectionButton(false);
    } else if (connectionStatus === ConnectionStatus.Accepted) {
      const removeconnectionpromise = changeConnectionStatus(
        props.userId,
        "Canceled",
      );
      removeconnectionpromise
        .then((response) => {
          toast.promise(removeconnectionpromise, {
            loading: "Removing Connection...",
            success: "User removed successfully!",
            error: "Failed to remove user. Please try again.",
          });
          if (response.status === 200) {
            console.log("Remove Connection Response:", response);
            setConnectionStatus(ConnectionStatus.Canceled);
          } else {
            console.error("Failed to Remove user:", response);
          }
        })
        .catch((error) => {
          console.error("Error Removing user:", error);
        });
    } else {
      const connectpromise = sendConnectionRequest(props.userId);
      toast.promise(connectpromise, {
        loading: "Sending connection request...",
        success: "Connection sent successfully!",
        error: "Failed to send connection request. Please try again.",
      });
      try {
        const response = await connectpromise;
        console.log("Connection Request Response:", response);
        if (response.status === 200) {
          setConnectionStatus(ConnectionStatus.Pending);
        }
      } catch (err) {
        console.error("Failed to send connection request:", err);
      }
    }
  };
  const handleWithdrawModal = async () => {
    const withdrawRequestPromise = changeConnectionStatus(
      props.userId,
      "Canceled",
    );
    toast.promise(withdrawRequestPromise, {
      loading: "Withdrawing connection request...",
      success: "Request Withdrawn successfully!",
      error: "Failed to withdraw connection request. Please try again.",
    });
    try {
      const response = await withdrawRequestPromise;
      if (response.status === 200) {
        console.log("Withdraw Request response:", response);
        setConnectionStatus(ConnectionStatus.Canceled);
      } else {
        console.error("Failed to withdraw connection request:", response);
      }
    } catch (error) {
      console.error("Failed to withdraw connection request:", error);
    }
    setModalOpen(false);
  };

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
            <span
              onClick={() => setIsContactInfoModalOpen(true)}
              className="text-crimsonRed font-medium cursor-pointer ml-2 hover:underline"
            >
              Contact Info
            </span>
          </div>
          <p
            className="text-crimsonRed font-medium cursor-pointer hover:underline"
            onClick={handleConnectionsClick}
          >
            Connections: {props.numberOfConnections}
          </p>
          {!props.isUser && (
            <p
              className="text-crimsonRed font-medium cursor-pointer hover:underline"
              onClick={handleMutualsClick}
            >
              Mutuals: {props.mutualConnections}
            </p>
          )}
        </div>
        {props.isUser && (
          <button
            onClick={() => setIsEditUserModalOpen(true)}
            className="material-icons text-mutedSilver w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer transition duration-400 ease-in-out"
          >
            edit
          </button>
        )}
      </div>

      {props.isUser && (
        <div className="flex mt-4 space-x-2">
          <button className="mt-2 px-4 py-1.5 border-1 rounded-3xl font-medium transition duration-300 ease-in-out border-crimsonRed hover:bg-crimsonRed hover:text-white">
            Enhance Profile
          </button>
          <ProfileUtilityButton
            isUser={props.isUser}
            userId={props.userId}
            connectionStatus={props.connectionStatus}
            isFollowing={props.isFollowing}
          />
        </div>
      )}

      {!props.isUser && (
        <div className="flex mt-4 space-x-2">
          <button
            onClick={() => {
              setOpnedChats((prevChats) => [
                ...prevChats,
                {
                  chatId: "",
                  usersId: [props.userId],
                  chatName: props.firstname,
                  chatImage: [props.profilePicture],
                },
              ]);
            }}
            className={`mt-2 px-4 py-1.5 border-1 rounded-3xl font-medium transition duration-300 ease-in-out border-crimsonRed hover:bg-crimsonRed hover:text-white`}
          >
            {messageButtonText}
          </button>
          {showConnectionButton && (
            <button
              className={`mt-2 px-4 py-1.5 border-1 rounded-3xl font-medium transition duration-300 ease-in-out ${connectionButtonStyle}`}
              onClick={handleConnectClick}
            >
              {connectionButtonText}
            </button>
          )}
          {showIgnoreButton && (
            <button
              className={`mt-2 px-4 py-1.5 border-1 rounded-3xl font-medium transition duration-300 ease-in-out border-gray-400 hover:bg-gray-200 text-gray-400`}
              onClick={handleIgnoreClick}
            >
              Ignore
            </button>
          )}
          <NetworkModal isOpen={modalOpen} onClose={handleCloseModal}>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 py-2">
                <h1 className="font-bold">Withdraw Invitation.</h1>
              </div>
              <div className="border-b border-gray-300 flex items-center justify-center py-3">
                <p className="font-semibold">
                  Are you sure you want to withdraw your invitation?
                </p>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-3">
                <button
                  data-testid="withdraw-modal-button"
                  className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-crimsonRed border-crimsonRed"
                  onClick={handleWithdrawModal}
                >
                  Withdraw
                </button>
                <button
                  data-testid="cancel-modal-button"
                  className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-darkGray border-darkGray"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </NetworkModal>
          <ProfileUtilityButton
            isUser={props.isUser}
            userId={props.userId}
            connectionStatus={props.connectionStatus}
            isFollowing={props.isFollowing}
          />
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

      <Modal
        isOpen={isContactInfoModalOpen}
        onClose={() => setIsContactInfoModalOpen(false)}
      >
        <ContactInfo
          phoneNumber={props.phoneNumber}
          userId={props.userId}
          email={props.email}
        />
      </Modal>
    </div>
  );
}

export default ProfileHeader;
