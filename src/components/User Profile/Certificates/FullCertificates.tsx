import {
  CertificateInterface,
  ProfileInterface,
} from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import "material-icons";
import { useParams } from "react-router-dom";
import Modal from "../../utils/Modal";
import {
  getCertificate,
  getMe,
  getUserById,
} from "@services/api/userProfileServices";
import UserCertificate from "./UserCertificate";
import AddCertificate from "./AddCertificate";
import EditCertificate from "./EditCertificate";
import { useQuery } from "@tanstack/react-query";
import store from "@store/store";
import MiniProfileHeader from "../ProfileHeader/MiniProfileHeader";
import { AnimatePresence } from "framer-motion";

export default function FullCertificates() {
  const { userId } = useParams();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [userData, setUserData] = useState<ProfileInterface>();
  const [addCertificateModal, setAddCertificateModal] =
    useState<boolean>(false);
  const [editCertificateData, setEditCertificateData] =
    useState<CertificateInterface | null>(null);

  const {
    isFetching: isMeFetching,
    isError: isMeError,
    refetch: refetchMe,
  } = useQuery({ queryKey: ["getMe"], queryFn: getMe, enabled: false });

  const {
    isFetching: isUserFetching,
    isError: isUserError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["getUserById", userId],
    queryFn: () => getUserById(userId!),
    enabled: false,
  });

  useEffect(() => {
    const loggedInUserId = store.getState().user.userId;
    if (userId === loggedInUserId) {
      setIsUser(true);
      refetchMe().then(({ data }) => {
        setUserData(data);
      });
    } else {
      setIsUser(false);
      refetchUser().then(({ data }) => {
        setUserData(data);
      });
    }
  }, [userId, refetchMe, refetchUser]);

  const { refetch: refetchCertificates } = useQuery({
    queryKey: ["getCertificates"],
    queryFn: getCertificate,
    enabled: false,
  });

  async function updateCertificates() {
    const { data } = await refetchCertificates();
    setUserData((prev) => (prev ? { ...prev, certificates: data } : prev));
  }

  if (isMeFetching || isUserFetching) {
    return <div>Loading...</div>;
  }

  if (isMeError || isUserError) {
    return <div>Error loading certificates</div>;
  }

  return (
    <>
      {userData && (
        <AnimatePresence>
          <div className="w-full bg-darkGray text-white">
            <MiniProfileHeader
              userId={userData.userId}
              firstname={userData.firstname}
              lastname={userData.lastname}
              headline={userData.headline}
              profilePicture={userData.profilePicture}
            />
          </div>
        </AnimatePresence>
      )}
      <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white w-12/12 lg:w-6/12 m-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-medium text-xl mb-4">Certificates</h1>
          {isUser && (
            <button
              onClick={() => setAddCertificateModal(true)}
              className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600 -mt-5 transition duration-400 ease-in-out"
            >
              add
            </button>
          )}
        </div>
        {userData && userData.certificates.length > 0 ? (
          userData.certificates.map((cert, index) => (
            <div key={cert.id} className="relative">
              <UserCertificate certificate={cert} />
              {isUser && (
                <button
                  className="material-icons absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-600 mr-1 transition duration-400 ease-in-out"
                  onClick={() => setEditCertificateData(cert)}
                >
                  edit
                </button>
              )}
              {index < userData.certificates.length - 1 && (
                <div className="border-b border-gray-500 w-11/12 mx-auto mt-2 mb-3"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-mutedSilver font-medium flex justify-center">
            No certificates are registered for this user
          </div>
        )}
        <Modal
          isOpen={!!editCertificateData}
          onClose={() => setEditCertificateData(null)}
        >
          {editCertificateData && (
            <EditCertificate
              {...editCertificateData}
              onClose={() => setEditCertificateData(null)}
              onUpdate={updateCertificates}
            />
          )}
        </Modal>
        <Modal
          isOpen={addCertificateModal}
          onClose={() => setAddCertificateModal(false)}
        >
          <AddCertificate
            onUpdate={updateCertificates}
            onClose={() => setAddCertificateModal(false)}
          />
        </Modal>
      </div>
    </>
  );
}
