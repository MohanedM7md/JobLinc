import { getMe, getExperience } from "@services/api/userProfileServices";
import UserExperience from "./Experiences/UserExperience";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useEffect, useState } from "react";
import { UserProfile } from "interfaces/userInterfaces";
import Modal from "./../Authentication/Modal";
import AddExperience from "./Experiences/AddExperience";
import "material-icons";
import { useNavigate } from "react-router-dom";

function ProfileContainer() {
  const [userData, setUserData] = useState<UserProfile>();
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    getMe().then((data) => {
      setUserData(data);
      console.log(data);
    });
  }, []);

  async function updateExperiences() {
    const updatedExperiences = await getExperience();
    setUserData((prevData) =>
      prevData
        ? {
            ...prevData,
            experience: updatedExperiences,
          }
        : undefined
    );
  };

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
        />
      )}
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
                navigate(
                  `/profile/${userData?.firstname}-${userData?.lastname}/details/experiences`,
                  { state: { experiences: userData?.experience ?? [] } },
                )
              }
              className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
            >
              edit
            </button>
          </div>
        </div>
        {userData && userData.experience.length > 0 ? (
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
                  navigate(
                    `/profile/${userData.firstname}-${userData.lastname}/details/experiences`,
                    { state: { experiences: userData.experience } },
                  )
                }
                className="mt-2 px-4 py-1 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
              >
                Show all {userData.experience.length} experiences
              </button>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-mutedSilver">
              Add your experience to improve your profile views and Lincs{" "}
            </h2>
            <button
              onClick={() => setAddExperienceModal(true)}
              className="cursor-pointer mt-2 px-4 py-1 border-1 border-crimsonRed rounded-3xl hover:bg-softRosewood font-medium"
            >
              Add experience
            </button>
          </div>
        )}
      </div>
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
    </div>
  );
}

export default ProfileContainer;
