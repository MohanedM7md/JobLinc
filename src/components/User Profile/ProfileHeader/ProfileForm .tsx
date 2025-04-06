import React, { useState } from "react";

interface ProfileFormProps {
  user: {
    firstname: string;
    lastname: string;
    bio: string;
    location: string;
    workExperience: Array<{
      title: string;
      company: string;
      startYear: number;
      endYear: number;
      description: string;
    }>;
    education: Array<{
      school: string;
      degree: string;
      fieldOfStudy: string;
      startYear: number;
      endYear: number;
    }>;
    skills: Array<{ name: string }>;
    industry: string;
  };
  onSave: (updatedUser: any) => void;
  close: (isModalOpen: boolean) => void;
}

function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index].name = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const handleExperienceChange = (
    index: number,
    key: string,
    value: string | number,
  ) => {
    const newExperience = [...formData.workExperience];
    newExperience[index] = { ...newExperience[index], [key]: value };
    setFormData({ ...formData, workExperience: newExperience });
  };

  const handleEducationChange = (
    index: number,
    key: string,
    value: string | number,
  ) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [key]: value };
    setFormData({ ...formData, education: newEducation });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form p-4 bg-lightGray rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          First Name
        </label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          Last Name
        </label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          Industry
        </label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          Skills
        </label>
        {formData.skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill.name}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder={`Skill ${index + 1}`}
          />
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          Work Experience
        </label>
        {formData.workExperience.map((exp, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={exp.title}
              onChange={(e) =>
                handleExperienceChange(index, "title", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Title"
            />
            <input
              type="text"
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(index, "company", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Company"
            />
            <input
              type="number"
              value={exp.startYear}
              onChange={(e) =>
                handleExperienceChange(index, "startYear", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Start Year"
            />
            <input
              type="number"
              value={exp.endYear}
              onChange={(e) =>
                handleExperienceChange(index, "endYear", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="End Year"
            />
            <textarea
              value={exp.description}
              onChange={(e) =>
                handleExperienceChange(index, "description", e.target.value)
              }
              className="w-full p-2 border rounded-lg"
              rows={2}
              placeholder="Description"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoalBlack">
          Education
        </label>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={edu.school}
              onChange={(e) =>
                handleEducationChange(index, "school", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="School"
            />
            <input
              type="text"
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(index, "degree", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Degree"
            />
            <input
              type="text"
              value={edu.fieldOfStudy}
              onChange={(e) =>
                handleEducationChange(index, "fieldOfStudy", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Field of Study"
            />
            <input
              type="number"
              value={edu.startYear}
              onChange={(e) =>
                handleEducationChange(index, "startYear", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Start Year"
            />
            <input
              type="number"
              value={edu.endYear}
              onChange={(e) =>
                handleEducationChange(index, "endYear", e.target.value)
              }
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="End Year"
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-lg"
        >
          Save Changes
        </button>
        <button className="bg-crimsonRed text-warmWhite px-4 py-2 rounded-lg">
          close
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
