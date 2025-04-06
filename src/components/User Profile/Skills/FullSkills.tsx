import { SkillInterface } from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import Modal from "../../Authentication/Modal";
import { getSkills } from "@services/api/userProfileServices";
import AddSkill from "./AddSkill";
import EditSkill from "./EditSkill";
import UserSkill from "./UserSkill";
import { useParams } from "react-router-dom";

export default function FullSkills() {
  const { userId } = useParams();
  const [skills, setSkills] = useState<SkillInterface[]>([]);
  const [addSkillModal, setAddSkillModal] = useState<boolean>(false);
  const [editSkillData, setEditSkillData] = useState<SkillInterface | null>(
    null,
  );

  useEffect(() => {
    updateSkills();
  }, [userId]);

  async function updateSkills() {
    if (userId) {
      const updatedSkills = await getSkills();
      setSkills(updatedSkills);
    }
  }

  return (
    <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-medium text-xl mb-4">Skills</h1>
        <button
          onClick={() => setAddSkillModal(true)}
          className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600"
        >
          add
        </button>
      </div>
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <div key={skill.id} className="relative">
            <UserSkill skill={skill} />
            <button
              className="material-icons absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-600 mr-1"
              onClick={() => setEditSkillData(skill)}
            >
              edit
            </button>
            {index < skills.length - 1 && (
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
  );
}
