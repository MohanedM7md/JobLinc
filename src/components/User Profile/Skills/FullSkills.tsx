import { SkillInterface, ProfileInterface } from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import Modal from "../../utils/Modal";
import { getMe, getSkills, getUserById } from "@services/api/userProfileServices";
import AddSkill from "./AddSkill";
import EditSkill from "./EditSkill";
import UserSkill from "./UserSkill";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import store from "@store/store";
import MiniProfileHeader from "../ProfileHeader/MiniProfileHeader";
import ErrorState from "../Miscellaneous/ErrorState";
import LoadingSkeleton from "../Miscellaneous/LoadingSkeleton";

export default function FullSkills() {
  const { userId } = useParams();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [addSkillModal, setAddSkillModal] = useState<boolean>(false);
  const [editSkillData, setEditSkillData] = useState<SkillInterface | null>(
    null,
  );
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
    refetch: refetchSkills,
  } = useQuery({
    queryKey: ["getSkills"],
    queryFn: getSkills,
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

  async function updateSkills() {
    const { data } = await refetchSkills();
    setUserData((prev) => (prev ? { ...prev, skills: data } : prev));
  }

  if (isMeFetching || isUserFetching) {
      return <LoadingSkeleton />;
    }
  
    if (isMeError || isUserError) {
      return (
        <ErrorState
          message="Error loading page, Please try again"
          fullScreen={true}
          retry={updateSkills}
        />
      );
    }

  return (
    <div className="bg-warmWhite h-dvh text-charcoalBlack">
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
          <h1 className="font-medium text-xl mb-4">Skills</h1>
          {isUser && (
            <button
              onClick={() => setAddSkillModal(true)}
              className="material-icons text-mutedSilver font-medium text-2xl p-2 rounded-full hover:bg-gray-200 transition duration-400 ease-in-out"
            >
              add
            </button>
          )}
        </div>
        {userData && userData.skills.length > 0 ? (
          userData.skills.map((skill, index) => (
            <div key={skill.id} className="relative">
              <UserSkill skill={skill} />
              {isUser && (
                <button
                  className="material-icons text-mutedSilver absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-200 mr-1 transition duration-400 ease-in-out"
                  onClick={() => setEditSkillData(skill)}
                >
                  edit
                </button>
              )}
              {index < userData.skills.length - 1 && (
                <div className="border-b border-gray-500 w-11/12 mx-auto mt-2 mb-3"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-mutedSilver font-medium flex justify-center">
            No Skills are registered for this user
          </div>
        )}
        <Modal isOpen={!!editSkillData} onClose={() => setEditSkillData(null)}>
          {editSkillData && (
            <EditSkill
              {...editSkillData}
              onClose={() => setEditSkillData(null)}
              onUpdate={updateSkills}
            />
          )}
        </Modal>
        <Modal isOpen={addSkillModal} onClose={() => setAddSkillModal(false)}>
          <AddSkill
            onUpdate={updateSkills}
            onClose={() => setAddSkillModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
