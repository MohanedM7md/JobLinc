import {
  getMe,
  getExperience,
  getCertificate,
  getSkills,
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
import { useNavigate } from "react-router-dom";

function ProfileContainer() {
  const [userData, setUserData] = useState<ProfileInterface>();
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  const [addCertificateModal, setAddCertificateModal] =
    useState<boolean>(false);
  const [addSkillModal, setAddSkillModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMe().then((data) => {
      setUserData(data);
      console.log(data);
    });
  }, []);

  async function updateUser() {
    const updatedUser = await getMe();
    setUserData(updatedUser);
  }

  async function updateExperiences() {
    const updatedExperiences = await getExperience();
    setUserData((prevData) =>
      prevData
        ? {
            ...prevData,
            experience: updatedExperiences,
          }
        : undefined,
    );
  }

  async function updateCertificates() {
    const updatedCertificates = await getCertificate();
    setUserData((prevData) =>
      prevData
        ? {
            ...prevData,
            certifications: updatedCertificates,
          }
        : undefined,
    );
  }

  async function updateSkills() {
    const updatedSkills = await getSkills();
    setUserData((prevData) =>
      prevData
        ? {
            ...prevData,
            skills: updatedSkills,
          }
        : undefined,
    );
  }

  return (
    <div className="profile-container p-4">
      {userData && (
        <ProfileHeader
          key={`Header of user ${userData.userId}`}
          firstname={userData.firstname}
          lastname={userData.lastname}
          headline={userData.headline}
          country={userData.country}
          city={userData.city}
          profilePicture={userData.profilePicture}
          phoneNumber={userData.phoneNumber}
          email={userData.email}
          updateUser={updateUser}
        />
      )}
      {userData && (
        <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-medium text-xl mb-4">Experience</h1>
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
          </div>
          {userData.experience.length > 0 ? (
            <>
              {userData.experience.slice(0, 2).map((experience, i) => {
                return (
                  <div className="flex flex-row justify-between items-center">
                    <UserExperience
                      key={`Experience ${i} of user ${userData.userId}`}
                      experience={experience}
                    />
                  </div>
                );
              })}
              {userData.experience.length > 2 && (
                <button
                  onClick={() =>
                    navigate(`/profile/${userData.userId}/details/experiences`)
                  }
                  className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Show all {userData.experience.length} experiences
                </button>
              )}
            </>
          ) : (
            <div>
              <h2 className="text-mutedSilver">
                Add your experience to improve your profile views and Lincs
              </h2>
              <button
                onClick={() => setAddExperienceModal(true)}
                className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
              >
                Add experience
              </button>
            </div>
          )}
        </div>
      )}
      {userData && (
        <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-medium text-xl mb-4">Certificates</h1>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setAddCertificateModal(true)}
                className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
              >
                add
              </button>
              <button
                onClick={() =>
                  navigate(`/profile/${userData?.userId}/details/certificates`)
                }
                className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
              >
                edit
              </button>
            </div>
          </div>
          {userData.certifications.length > 0 ? (
            <>
              {userData.certifications.slice(0, 2).map((certificate, i) => (
                <div className="flex flex-row justify-between items-center">
                  <UserCertificate
                    key={`Certificate ${i} of user ${userData.userId}`}
                    certificate={certificate}
                  />
                </div>
              ))}
              {userData.certifications.length > 2 && (
                <button
                  onClick={() =>
                    navigate(`/profile/${userData.userId}/details/certificates`)
                  }
                  className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Show all {userData.certifications.length} certificates
                </button>
              )}
            </>
          ) : (
            <div>
              <h2 className="text-mutedSilver">
                Add your certificates to showcase your achievements
              </h2>
              <button
                onClick={() => setAddCertificateModal(true)}
                className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
              >
                Add certificate
              </button>
            </div>
          )}
        </div>
      )}
      {userData && (
        <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-medium text-xl mb-4">Skills</h1>
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
                  className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
                >
                  Show all {userData.skills.length} skills
                </button>
              )}
            </>
          ) : (
            <div>
              <h2 className="text-mutedSilver">
                Add your skills to showcase your expertise
              </h2>
              <button
                onClick={() => setAddSkillModal(true)}
                className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
              >
                Add skill
              </button>
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
