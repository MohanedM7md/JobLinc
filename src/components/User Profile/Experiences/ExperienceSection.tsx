import Modal from "./../../utils/Modal";
import AddExperience from "./AddExperience";
import UserExperience from "./UserExperience";
import { ExperienceInterface } from "@interfaces/userInterfaces";
import { useNavigate } from "react-router-dom";

interface ExperienceSectionProps {
    userId: string;
    experiences: ExperienceInterface[],
    isUser: boolean
}

export default function ExperienceSection(props: ExperienceSectionProps) {
    const navigate = useNavigate()
    //return (
    //  <div className="my-2 p-4 rounded-lg shadow-md relative bg-lightGray">
    //    <div className="flex flex-row justify-between items-center">
    //      <h1 className="font-medium text-xl mb-4">Experience</h1>
    //      {props.isUser && (
    //        <div className="flex flex-row gap-2">
    //          <button
    //            onClick={() => setAddExperienceModal(true)}
    //            className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200 transition duration-400 ease-in-out"
    //          >
    //            add
    //          </button>
    //          <button
    //            onClick={() =>
    //              navigate(`/profile/${props.userId}/details/experiences`)
    //            }
    //            className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-200 transition duration-400 ease-in-out"
    //          >
    //            edit
    //          </button>
    //        </div>
    //      )}
    //    </div>
    //    {props.experiences.length > 0 ? (
    //      <>
    //        {props.experiences.slice(0, 2).map((experience, i) => {
    //          return (
    //            <div className="flex flex-row justify-between items-center">
    //              <UserExperience
    //                key={`Experience ${i} of user ${props.userId}`}
    //                experience={experience}
    //              />
    //            </div>
    //          );
    //        })}
    //        {props.experiences.length > 2 && (
    //          <button
    //            onClick={() =>
    //              navigate(`/profile/${props.userId}/details/experiences`)
    //            }
    //            className="mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium transition duration-400 ease-in-out"
    //          >
    //            Show all {props.experiences.length} experiences
    //          </button>
    //        )}
    //      </>
    //    ) : (
    //      <div>
    //        <h2 className="text-mutedSilver">
    //          {props.isUser
    //            ? "Add your experience to improve your profile views and Lincs"
    //            : "User has no experience"}
    //        </h2>
    //        {props.isUser && (
    //          <button
    //            onClick={() => setAddExperienceModal(true)}
    //            className="cursor-pointer mt-2 px-4 py-1.5 border-1 border-crimsonRed rounded-3xl hover:bg-crimsonRed hover:text-white font-medium transition duration-400 ease-in-out"
    //          >
    //            Add experience
    //          </button>
    //        )}
    //      </div>
    //    )}
    //    <Modal
    //              isOpen={addExperienceModal}
    //              onClose={() => setAddExperienceModal(false)}
    //            >
    //              <AddExperience
    //                key={`Adding Experience to ${props.userId}`}
    //                onUpdate={updateExperiences}
    //                onClose={() => setAddExperienceModal(false)}
    //              />
    //            </Modal>
    //  </div>
    //);
}