import {
  EducationInterface,
  ProfileInterface,
} from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import "material-icons";
import { useParams } from "react-router-dom";
import Modal from "../../utils/Modal";
import {
  getEducation,
  getMe,
  getUserById,
} from "@services/api/userProfileServices";
import { useQuery } from "@tanstack/react-query";
import store from "@store/store";
import MiniProfileHeader from "../ProfileHeader/MiniProfileHeader";
import UserEducation from "./UserEducation";
import EditEducation from "./EditEducation";
import AddEducation from "./AddEducation";
import ErrorState from "../Miscellaneous/ErrorState";
import LoadingSkeleton from "../Miscellaneous/LoadingSkeleton";

export default function FullEducations() {
  const { userId } = useParams();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [addEducationModal, setAddEducationModal] = useState<boolean>(false);
  const [editEducationData, setEditEducationData] =
    useState<EducationInterface | null>(null);
  const [userData, setUserData] = useState<ProfileInterface>();

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

  const { refetch: refetchEducations } = useQuery({
    queryKey: ["getEducations"],
    queryFn: getEducation,
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

  async function updateEducations() {
    const { data } = await refetchEducations();
    setUserData((prev) => (prev ? { ...prev, education: data } : prev));
  }

  if (isMeFetching || isUserFetching) {
      return <LoadingSkeleton />
    }
  
    if (isMeError || isUserError) {
      return <ErrorState message="Error loading page, Please try again" fullScreen={true} retry={updateEducations} />
    }

  return (
    <div className="bg-warmWhite text-charcoalBlack min-h-dvh h-full">
      {userData && (
        <div className="w-full">
          <MiniProfileHeader
            userId={userData.userId}
            firstname={userData.firstname}
            lastname={userData.lastname}
            headline={userData.headline}
            profilePicture={userData.profilePicture}
          />
        </div>
      )}
      <div className="bg-charcoalWhite my-2 p-4 rounded-lg shadow-md relative w-12/12 lg:w-6/12 m-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-medium text-xl mb-4">Education</h1>
          {isUser && (
            <button
              onClick={() => setAddEducationModal(true)}
              className="material-icons text-mutedSilver font-medium text-2xl p-1 mr-1 rounded-full hover:bg-gray-200 -mt-5 transition duration-400 ease-in-out"
            >
              add
            </button>
          )}
        </div>
        {userData && userData.education.length > 0 ? (
          userData.education.map((exp, index) => (
            <div key={exp.id} className="relative">
              <UserEducation education={exp} />
              {isUser && (
                <button
                  className="material-icons text-mutedSilver absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-200 mr-1 transition duration-400 ease-in-out"
                  onClick={() => setEditEducationData(exp)}
                >
                  edit
                </button>
              )}
              {index < userData.education.length - 1 && (
                <div className="border-b border-gray-500 w-11/12 mx-auto mt-2 mb-3"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-mutedSilver font-medium flex justify-center">
            No Educations are registered for this user
          </div>
        )}
        <Modal
          isOpen={!!editEducationData}
          onClose={() => setEditEducationData(null)}
        >
          {editEducationData && (
            <EditEducation
              {...editEducationData}
              onClose={() => setEditEducationData(null)}
              onUpdate={updateEducations}
            />
          )}
        </Modal>
        <Modal
          isOpen={addEducationModal}
          onClose={() => setAddEducationModal(false)}
        >
          <AddEducation
            onUpdate={updateEducations}
            onClose={() => setAddEducationModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
