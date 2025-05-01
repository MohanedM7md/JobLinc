import {
  ExperienceInterface,
  ProfileInterface,
} from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import UserExperience from "./UserExperience";
import EditExperience from "./EditExperience";
import "material-icons";
import { useParams } from "react-router-dom";
import AddExperience from "./AddExperience";
import Modal from "../../utils/Modal";
import {
  getExperience,
  getMe,
  getUserById,
} from "@services/api/userProfileServices";
import { useQuery } from "@tanstack/react-query";
import store from "@store/store";
import MiniProfileHeader from "../ProfileHeader/MiniProfileHeader";

export default function FullExperiences() {
  const { userId } = useParams();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  const [editExperienceData, setEditExperienceData] =
    useState<ExperienceInterface | null>(null);
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

  const {
    refetch: refetchExperiences,
  } = useQuery({
    queryKey: ["getExperiences"],
    queryFn: getExperience,
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

  async function updateExperiences() {
    const { data } = await refetchExperiences();
    setUserData((prev) => (prev ? { ...prev, experiences: data } : prev));
  }

  if (isMeFetching || isUserFetching) {
    return <div>Loading...</div>;
  }

  if (isMeError || isUserError) {
    return <div>Error loading experiences</div>;
  }

  return (
    <>
      {userData && (
        <div className="w-full bg-darkGray text-white">
          <MiniProfileHeader
            userId={userData.userId}
            firstname={userData.firstname}
            lastname={userData.lastname}
            headline={userData.headline}
            profilePicture={userData.profilePicture}
          />
        </div>
      )}
      <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white w-12/12 lg:w-6/12 m-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-medium text-xl mb-4">Experience</h1>
          {isUser && (
            <button
              onClick={() => setAddExperienceModal(true)}
              className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600 -mt-5 transition duration-400 ease-in-out"
            >
              add
            </button>
          )}
        </div>
        {userData && userData.experiences.length > 0 ? (
          userData.experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              <UserExperience experience={exp} />
              {isUser && (
                <button
                  className="material-icons absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-600 mr-1 transition duration-400 ease-in-out"
                  onClick={() => setEditExperienceData(exp)}
                >
                  edit
                </button>
              )}
              {index < userData.experiences.length - 1 && (
                <div className="border-b border-gray-500 w-11/12 mx-auto mt-2 mb-3"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-mutedSilver font-medium flex justify-center">
            No experiences are registered for this user
          </div>
        )}
        <Modal
          isOpen={!!editExperienceData}
          onClose={() => setEditExperienceData(null)}
        >
          {editExperienceData && (
            <EditExperience
              {...editExperienceData}
              onClose={() => setEditExperienceData(null)}
              onUpdate={updateExperiences}
            />
          )}
        </Modal>
        <Modal
          isOpen={addExperienceModal}
          onClose={() => setAddExperienceModal(false)}
        >
          <AddExperience
            onUpdate={updateExperiences}
            onClose={() => setAddExperienceModal(false)}
          />
        </Modal>
      </div>
    </>
  );
}
