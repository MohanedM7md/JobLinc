import React, { useState } from "react";

const ProfileBody: React.FC = () => {
  const [bio, setBio] = useState<string>("");
  const [workExperience, setWorkExperience] = useState<string[]>([""]);
  const [education, setEducation] = useState<string[]>([""]);
  const [skills, setSkills] = useState<string[]>([]);
  const [industry, setIndustry] = useState<string>("");

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleWorkExperienceChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index] = event.target.value;
    setWorkExperience(newWorkExperience);
  };

  const handleEducationChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newEducation = [...education];
    newEducation[index] = event.target.value;
    setEducation(newEducation);
  };

  const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(event.target.value.split(",").map((skill) => skill.trim()));
  };

  const handleIndustryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndustry(event.target.value);
  };

  return (
    <div className="profile-body bg-white p-4 rounded-lg shadow-md">
      <textarea
        value={bio}
        onChange={handleBioChange}
        placeholder="Bio"
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <div className="mb-4">
        {workExperience.map((exp, index) => (
          <input
            key={index}
            type="text"
            value={exp}
            onChange={(event) => handleWorkExperienceChange(index, event)}
            placeholder={`Work Experience ${index + 1}`}
            className="w-full p-2 mb-2 border rounded-lg"
          />
        ))}
      </div>
      <div className="mb-4">
        {education.map((edu, index) => (
          <input
            key={index}
            type="text"
            value={edu}
            onChange={(event) => handleEducationChange(index, event)}
            placeholder={`Education ${index + 1}`}
            className="w-full p-2 mb-2 border rounded-lg"
          />
        ))}
      </div>
      <input
        type="text"
        value={skills.join(", ")}
        onChange={handleSkillsChange}
        placeholder="Skills"
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <input
        type="text"
        value={industry}
        onChange={handleIndustryChange}
        placeholder="Industry"
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
};

export default ProfileBody;
