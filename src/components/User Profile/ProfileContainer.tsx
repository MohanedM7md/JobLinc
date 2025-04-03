import { getMe } from "@services/api/userProfileServices";
import UserExperience from "./Experiences/UserExperience";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useEffect, useState } from "react";
import { UserProfile } from "interfaces/userInterfaces";
import Modal from "./../Authentication/Modal";
import AddExperience from "./Experiences/AddExperience";
import "material-icons";

function ProfileContainer() {
  const [userData, setUserData] = useState<UserProfile>();
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  useEffect(() => {
    getMe().then((data) => {
      setUserData(data);
      console.log(data);
    });
  }, []);

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
            <button onClick={() => setAddExperienceModal(true)} className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600">add</button>
            <button className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600">edit</button>
          </div>
        </div>
        {userData && userData.experience.length > 0 ? (
          userData?.experience?.map((experience, i) => {
            return (
              <UserExperience
                key={`Experience ${i} of user ${userData.userId}`}
                experience={experience}
              />
            );
          })
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
        <AddExperience />
      </Modal>
    </div>
  );
}

export default ProfileContainer;
