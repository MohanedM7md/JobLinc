import {
  getMe,
  getExperience,
  getCertificate,
  getSkills,
} from "@services/api/userProfileServices";
import UserExperience from "./Experiences/UserExperience";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useEffect, useState } from "react";
import {
  CertificateInterface,
  ExperienceInterface,
  ProfileInterface,
  SkillInterface,
} from "interfaces/userInterfaces";
import Modal from "./../Authentication/Modal";
import AddExperience from "./Experiences/AddExperience";
import AddCertificate from "./Certificates/AddCertificate";
import UserCertificate from "./Certificates/UserCertificate";
import AddSkill from "./Skills/AddSkill";
import UserSkill from "./Skills/UserSkill";
import "material-icons";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "@services/api/config";

function ProfileContainer() {
  const [userData, setUserData] = useState<ProfileInterface>();
  const [userExperience, setUserExperience] = useState<ExperienceInterface[]>(
    [],
  );
  const [userCertificates, setUserCertificates] = useState<
    CertificateInterface[]
  >([]);
  const [userSkills, setUserSkills] = useState<SkillInterface[]>([]);
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  const [addCertificateModal, setAddCertificateModal] =
    useState<boolean>(false);
  const [addSkillModal, setAddSkillModal] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMe().then((data) => {
      setUserData(data);
    });
    getExperience().then((data) => {
      setUserExperience(data);
    });
    getCertificate().then((data) => {
      setUserCertificates(data);
    });
    getSkills().then((data) => {
      setUserSkills(data);
    });
  }, []);

  async function updateUser() {
    const updatedUser = await getMe();
    setUserData(updatedUser);
  }

  async function updateExperiences() {
    const updatedExperiences = await getExperience();
    setUserExperience(updatedExperiences);
  }

  async function updateCertificates() {
    const updatedCertificates = await getCertificate();
    setUserCertificates(updatedCertificates);
  }

  async function updateSkills() {
    const updatedSkills = await getSkills();
    setUserSkills(updatedSkills);
  }

  return (
    <div className="profile-container p-4 w-12/12 lg:w-8/12 m-auto">
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
              ? `${SERVER_URL}${userData.profilePicture}`
              : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          coverPicture={
            userData.coverPicture
              ? `${SERVER_URL}${userData.coverPicture}`
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
        <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-medium text-xl mb-4">Experience</h1>
            {isUser && (
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => setAddExperienceModal(true)}
                  className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
                >
                  add
                </button>
                <button
                  onClick={() =>
                    navigate(`/profile/${userData?.userId}/details/experiences`)
                  }
                  className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
                >
                  edit
                </button>
              </div>
            )}
          </div>
          {userExperience.length > 0 ? (
            <>
              {userExperience.slice(0, 2).map((experience, i) => {
                return (
                  <div className="flex flex-row justify-between items-center">
                    <UserExperience
                      key={`Experience ${i} of user ${userData.userId}`}
                      experience={experience}
                    />
                  </div>
                );
              })}
              {userExperience.length > 2 && (
                <button
                  onClick={() =>
                    navigate(`/profile/${userData.userId}/details/experiences`)
                  }
                  className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Show all {userExperience.length} experiences
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
                  className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Add experience
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {userData && (
        <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-medium text-xl mb-4">Certificates</h1>
            {isUser && (
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => setAddCertificateModal(true)}
                  className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
                >
                  add
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/profile/${userData?.userId}/details/certificates`,
                    )
                  }
                  className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
                >
                  edit
                </button>
              </div>
            )}
          </div>
          {userCertificates.length > 0 ? (
            <>
              {userCertificates.slice(0, 2).map((certificate, i) => (
                <div className="flex flex-row justify-between items-center">
                  <UserCertificate
                    key={`Certificate ${i} of user ${userData.userId}`}
                    certificate={certificate}
                  />
                </div>
              ))}
              {userCertificates.length > 2 && (
                <button
                  onClick={() =>
                    navigate(`/profile/${userData.userId}/details/certificates`)
                  }
                  className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Show all {userCertificates.length} certificates
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
                  className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Add certificate
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {userData && (
        <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-medium text-xl mb-4">Skills</h1>
            {isUser && (
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => setAddSkillModal(true)}
                  className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
                >
                  add
                </button>
                <button
                  onClick={() =>
                    navigate(`/profile/${userData?.userId}/details/skills`)
                  }
                  className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
                >
                  edit
                </button>
              </div>
            )}
          </div>
          {userSkills.length > 0 ? (
            <>
              {userSkills.slice(0, 2).map((skill, i) => (
                <div className="flex flex-row justify-between items-center">
                  <UserSkill
                    key={`Skill ${i} of user ${userData.userId}`}
                    skill={skill}
                  />
                </div>
              ))}
              {userSkills.length > 2 && (
                <button
                  onClick={() =>
                    navigate(`/profile/${userData.userId}/details/skills`)
                  }
                  className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Show all {userSkills.length} skills
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
                  className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
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
  );
}

export default ProfileContainer;
