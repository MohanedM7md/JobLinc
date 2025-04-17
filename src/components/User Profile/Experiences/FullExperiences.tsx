import { ExperienceInterface } from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import UserExperience from "./UserExperience";
import EditExperience from "./EditExperience";
import "material-icons";
import { useParams } from "react-router-dom";
import AddExperience from "./AddExperience";
import Modal from "./../../Authentication/Modal";
import { getExperience } from "@services/api/userProfileServices";
import { useQuery } from "@tanstack/react-query";

export default function FullExperiences() {
  const { userId } = useParams();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [experiences, setExperiences] = useState<ExperienceInterface[]>([]);
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  const [editExperienceData, setEditExperienceData] =
    useState<ExperienceInterface | null>(null);

  const {
    isFetching: isExperiencesFetching,
    isError: isExperiencesError,
    refetch: refetchExperiences,
  } = useQuery({
    queryKey: ["getExperiences"],
    queryFn: getExperience,
    enabled: false,
  });

  useEffect(() => {
    if (userId === JSON.parse(localStorage.getItem("userState") || "").userId) {
      setIsUser(true);
      updateExperiences();
    } else {
      setIsUser(false);
    }
  }, [userId]);

  async function updateExperiences() {
    if (userId) {
      const { data } = await refetchExperiences();
      setExperiences(data);
    }
  }

  if (isExperiencesFetching) {
    return <div>Loading...</div>;
  }

  if (isExperiencesError) {
    return <div>Error loading experiences</div>;
  }

  return (
    <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white w-12/12 lg:w-6/12 m-auto">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-medium text-xl mb-4">Experience</h1>
        {isUser && (
          <button
            onClick={() => setAddExperienceModal(true)}
            className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600 -mt-5"
          >
            add
          </button>
        )}
      </div>
      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <div key={exp._id} className="relative">
            <UserExperience experience={exp} />
            {isUser && (
              <button
                className="material-icons absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-600 mr-1"
                onClick={() => setEditExperienceData(exp)}
              >
                edit
              </button>
            )}
            {index < experiences.length - 1 && (
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
  );
}
