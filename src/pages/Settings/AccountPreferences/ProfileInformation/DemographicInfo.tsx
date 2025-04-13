import { ChevronLeftIcon, CheckCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

function DemographicInfo() {
  const navigate = useNavigate();

  // Initial values (could be fetched from API)
  const [savedData, setSavedData] = useState({
    gender: "select",
    disability: "select",
  });

  const [gender, setGender] = useState(savedData.gender);
  const [disability, setDisability] = useState(savedData.disability);
  const [isSaved, setIsSaved] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Check if anything has changed from saved state
  const hasChanged = gender !== savedData.gender || disability !== savedData.disability;

  function handleSave() {
    // Simulate saving data
    setSavedData({ gender, disability });
    setIsSaved(true);

    // Auto-hide saved message
    setTimeout(() => setIsSaved(false), 3000);
  };

  function handleRemove()
  {
    setGender("select");
    setDisability("select");
    setSavedData({gender, disability});
    setIsRemoved(true);
    setTimeout(() => setIsRemoved(false), 3000);
  }

  return (
    <div className="flex justify-center px-4 py-6 sm:px-8 md:px-16">
        <div className="bg-white rounded-xl flex flex-col gap-4 p-4 sm:p-6 w-full max-w-[1000px]">
            <div
                className="flex items-center w-[60px] hover:underline hover:cursor-pointer"
                onClick={() => {
                navigate("/settings/account-preferences");
                }}
            >
                <ChevronLeftIcon />
                <p>Back</p>
            </div>

            <div className="mb-5 flex flex-col gap-3">
                <h3 className="font-semibold text-[20px]">Demographic info</h3>
                <p>Here's the information you've provided about yourself. This will not be displayed on your profile.</p>
                <p>You can always remove all personal demographic data submitted in these categories.</p>
                <button className="bg-crimsonRed py-2 px-4 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer w-fit" onClick={handleRemove}>Remove</button>
                {isRemoved && (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircleIcon className="w-5 h-5" />
                    <p>Your data has been removed</p>
                </div>
                )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-3 border-b-black border-solid border-b-1 p-5">
                <p className="font-semibold">Gender</p>
                <div className="flex flex-col gap-3">
                <label htmlFor="gender">Select your gender identity: </label>
                <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => {
                        setGender(e.target.value);
                        setIsSaved(false);
                    }}
                    className="w-full p-3 text-base rounded-lg appearance-none border border-gray-300 focus:outline-none focus:ring-2"
                    >
                    <option value="select">Select</option>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                </select>
                </div>
            </div>

            {/* Disability */}
            <div className="flex flex-col gap-3 border-b-black border-solid border-b-1 p-5">
                <p className="font-semibold">Disability</p>
                <div className="flex flex-col gap-3">
                <label htmlFor="disability">
                    Do you have a disability that substantially limits a major life activity, or a history of a disability?
                </label>
                <select
                    id="disability"
                    name="disability"
                    value={disability}
                    onChange={(e) => {
                        setDisability(e.target.value);
                        setIsSaved(false);
                    }}
                    className="w-full p-3 text-base rounded-lg appearance-none border border-gray-300 focus:outline-none focus:ring-2"
                    >
                    <option value="select">Select</option>
                    <option value="yes">Yes, I have (or previously had) a disability</option>
                    <option value="no">No, I don't have a disability</option>
                    <option value="secret">Prefer not to say</option>
                </select>
                </div>
            </div>

            {/* Info Message */}
            <div className="bg-warmWhite p-4 rounded-xl">
                <p className="font-bold">How JobLinc uses this data</p>
                <p>
                Your demographic data will not be shown on your profile. It will be used to provide aggregated workforce and
                salary insights to you and others, to feature news, ads and other content personalized for you, and to
                provide tools and insights to help employers reach a diverse talent pool.{" "}
                <Link to="/home" className="font-semibold hover:underline hover:cursor-pointer text-crimsonRed">
                    Learn more
                </Link>
                </p>
            </div>

            {/* Save Button & Success Message */}
            <div className="flex flex-col items-start gap-2">
                <button
                id="Agree"
                className={`w-full bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl ${
                    hasChanged ? "hover:bg-softRosewood hover:cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={handleSave}
                disabled={!hasChanged}
                >
                Agree and Save
                </button>

                {isSaved && (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircleIcon className="w-5 h-5" />
                    <p>Your information has been saved</p>
                </div>
                )}
            </div>
        </div>
    </div>
    
  );
}

export default DemographicInfo;
