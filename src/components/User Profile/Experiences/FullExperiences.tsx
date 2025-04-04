import { ExperienceInterface } from "interfaces/userInterfaces";
import { useState } from "react";
import UserExperience from "./UserExperience";
import EditExperience from "./EditExperience";
import "material-icons";
import { useLocation } from "react-router-dom";
import AddExperience from "./AddExperience";
import Modal from "./../../Authentication/Modal";

export default function FullExperiences() {
  const location = useLocation();
  const [experiences, setExperiences] = useState<ExperienceInterface[]>(
    location.state.experiences,
  );
  const [addExperienceModal, setAddExperienceModal] = useState<boolean>(false);
  const [editExperienceData, setEditExperienceData] =
    useState<ExperienceInterface | null>(null);

  return (
    <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-medium text-xl mb-4">Experience</h1>
        <button
          onClick={() => setAddExperienceModal(true)}
          className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600 -mt-5"
        >
          add
        </button>
      </div>
      {experiences.map((exp, index) => (
        <div key={exp.id} className="relative">
          <UserExperience experience={exp} />
          <button
            className="material-icons absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-600 mr-1"
            onClick={() => setEditExperienceData(exp)}
          >
            edit
          </button>
          {index < experiences.length - 1 && (
            <div className="border-b border-gray-500 w-3/4 mx-auto mt-4"></div>
          )}
        </div>
      ))}
      <Modal
        isOpen={!!editExperienceData}
        onClose={() => setEditExperienceData(null)}
      >
        {editExperienceData && (
          <EditExperience
            {...editExperienceData}
            onClose={() => setEditExperienceData(null)}
          />
        )}
      </Modal>
      <Modal
        isOpen={addExperienceModal}
        onClose={() => setAddExperienceModal(false)}
      >
        <AddExperience />
      </Modal>
    </div>
  );
}
