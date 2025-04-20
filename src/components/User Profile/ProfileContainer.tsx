import {
  getMe,
  getExperience,
  getCertificate,
  getSkills,
  getUserById,
} from "@services/api/userProfileServices";
import UserExperience from "./Experiences/UserExperience";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useEffect, useState } from "react";
import { ProfileInterface } from "interfaces/userInterfaces";
import Modal from "./../Authentication/Modal";
import AddExperience from "./Experiences/AddExperience";
import AddCertificate from "./Certificates/AddCertificate";
import UserCertificate from "./Certificates/UserCertificate";
import AddSkill from "./Skills/AddSkill";
import UserSkill from "./Skills/UserSkill";
import "material-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import store from "@store/store";

function ProfileContainer() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<ProfileInterface>();
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  const [addCertificateModal, setAddCertificateModal] =
    useState<boolean>(false);
  const [addSkillModal, setAddSkillModal] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(true);
  const navigate = useNavigate();

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
    isFetching: isExperiencesFetching,
    isError: isExperiencesError,
    refetch: refetchExperiences,
  } = useQuery({
    queryKey: ["getExperiences"],
    queryFn: getExperience,
    enabled: false,
  });

  const {
    isFetching: isCertificatesFetching,
    isError: isCertificatesError,
    refetch: refetchCertificates,
  } = useQuery({
    queryKey: ["getCertificates"],
    queryFn: getCertificate,
    enabled: false,
  });

  const {
    isFetching: isSkillsFetching,
    isError: isSkillsError,
    refetch: refetchSkills,
  } = useQuery({
    queryKey: ["getSkills"],
    queryFn: getSkills,
    enabled: false,
  });

  useEffect(() => {
    const loggedInUserId = store.getState().user.userId 
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

  async function updateUser() {
    const { data } = await refetchMe();
    setUserData(data);
  }

  async function updateExperiences() {
    const { data } = await refetchExperiences();
    setUserData((prev) => (prev ? { ...prev, experiences: data } : prev));
  }

  async function updateCertificates() {
    const { data } = await refetchCertificates();
    setUserData((prev) => (prev ? { ...prev, certificates: data } : prev));
  }

  async function updateSkills() {
    const { data } = await refetchSkills();
    setUserData((prev) => (prev ? { ...prev, skills: data } : prev));
  }

  if (
    isMeFetching ||
    isCertificatesFetching ||
    isExperiencesFetching ||
    isSkillsFetching ||
    isUserFetching
  ) {
    return <div>Loading...</div>; 
  }

  if (
    isMeError ||
    isCertificatesError ||
    isExperiencesError ||
    isSkillsError ||
    isUserError
  ) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="bg-warmWhite">
      <div className="profile-container pb-4 w-12/12 lg:w-8/12 m-auto bg-lightGray text-charcoalBlack">
        {userData && (
          <ProfileHeader
            key={`Header of user ${userData.userId}`}
            userId={userData.userId}
            firstname={userData.firstname}
            lastname={userData.lastname}
            headline={userData.headline}
            country={userData.country}
            city={userData.city}
            profilePicture={
              userData.profilePicture
                ? `${userData.profilePicture}`
                : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            coverPicture={
              userData.coverPicture
                ? `${userData.coverPicture}`
                : "https://fastly.picsum.photos/id/6/500/150.jpg?hmac=DNsBPoYhZrvLVc__YwZt4A-PY7MIPBseudP2AQzu4Is"
            }
            phoneNumber={userData.phoneNumber}
            numberofConnections={
              userData.numberofConnections ? userData.numberofConnections : 0
            }
            email={userData.email}
            updateUser={updateUser}
            isUser={isUser}
          />
        )}
        {userData && (
          <div className="my-2 p-4 rounded-lg shadow-md relative">
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-medium text-xl mb-4">Experience</h1>
              {isUser && (
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => setAddExperienceModal(true)}
                    className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200"
                  >
                    add
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/profile/${userData?.userId}/details/experiences`,
                      )
                    }
                    className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200"
                  >
                    edit
                  </button>
                </div>
              )}
            </div>
            {userData.experiences.length > 0 ? (
              <>
                {userData.experiences.slice(0, 2).map((experience, i) => {
                  return (
                    <div className="flex flex-row justify-between items-center">
                      <UserExperience
                        key={`Experience ${i} of user ${userData.userId}`}
                        experience={experience}
                      />
                    </div>
                  );
                })}
                {userData.experiences.length > 2 && (
                  <button
                    onClick={() =>
                      navigate(
                        `/profile/${userData.userId}/details/experiences`,
                      )
                    }
                    className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium"
                  >
                    Show all {userData.experiences.length} experiences
                  </button>
                )}
              </>
            ) : (
              <div>
                <h2 className="text-mutedSilver">
                  {isUser
                    ? "Add your experience to improve your profile views and Lincs"
                    : "User has no experience"}
                </h2>
                {isUser && (
                  <button
                    onClick={() => setAddExperienceModal(true)}
                    className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium"
                  >
                    Add experience
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {userData && (
          <div className="my-2 p-4 rounded-lg shadow-md relative">
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-medium text-xl mb-4">Certificates</h1>
              {isUser && (
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => setAddCertificateModal(true)}
                    className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200"
                  >
                    add
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/profile/${userData?.userId}/details/certificates`,
                      )
                    }
                    className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200"
                  >
                    edit
                  </button>
                </div>
              )}
            </div>
            {userData.certificates.length > 0 ? (
              <>
                {userData.certificates.slice(0, 2).map((certificate, i) => (
                  <div className="flex flex-row justify-between items-center">
                    <UserCertificate
                      key={`Certificate ${i} of user ${userData.userId}`}
                      certificate={certificate}
                    />
                  </div>
                ))}
                {userData.certificates.length > 2 && (
                  <button
                    onClick={() =>
                      navigate(
                        `/profile/${userData.userId}/details/certificates`,
                      )
                    }
                    className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium"
                  >
                    Show all {userData.certificates.length} certificates
                  </button>
                )}
              </>
            ) : (
              <div>
                <h2 className="text-mutedSilver">
                  {isUser
                    ? "Add your certificates to showcase your achievements"
                    : "User has no certificates"}
                </h2>
                {isUser && (
                  <button
                    onClick={() => setAddCertificateModal(true)}
                    className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium"
                  >
                    Add certificate
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {userData && (
          <div className="my-2 p-4 rounded-lg shadow-md relative">
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-medium text-xl mb-4">Skills</h1>
              {isUser && (
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => setAddSkillModal(true)}
                    className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200"
                  >
                    add
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/profile/${userData?.userId}/details/skills`)
                    }
                    className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200"
                  >
                    edit
                  </button>
                </div>
              )}
            </div>
            {userData.skills.length > 0 ? (
              <>
                {userData.skills.slice(0, 2).map((skill, i) => (
                  <div className="flex flex-row justify-between items-center">
                    <UserSkill
                      key={`Skill ${i} of user ${userData.userId}`}
                      skill={skill}
                    />
                  </div>
                ))}
                {userData.skills.length > 2 && (
                  <button
                    onClick={() =>
                      navigate(`/profile/${userData.userId}/details/skills`)
                    }
                    className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium"
                  >
                    Show all {userData.skills.length} skills
                  </button>
                )}
              </>
            ) : (
              <div>
                <h2 className="text-mutedSilver">
                  {isUser
                    ? "Add your skills to showcase your expertise"
                    : "User has no skills"}
                </h2>
                {isUser && (
                  <button
                    onClick={() => setAddSkillModal(true)}
                    className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium"
                  >
                    Add skill
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        <Modal
          isOpen={addExperienceModal}
          onClose={() => setAddExperienceModal(false)}
        >
          <AddExperience
            key={`Adding Experience to ${userData?.firstname} ${userData?.lastname}`}
            onUpdate={updateExperiences}
            onClose={() => setAddExperienceModal(false)}
          />
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

export default ProfileContainer;
