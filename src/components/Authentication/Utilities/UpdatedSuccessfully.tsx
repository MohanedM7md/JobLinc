import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface UpdatedSuccessfullyProps {
  WhatIsUpdated: string;
  goTo: string;
}

function UpdatedSuccessfully(props: UpdatedSuccessfullyProps) {
    const navigate = useNavigate();
    return (
    <div className="z-50 bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 max-w-[90%] sm:max-w-xl mx-auto mt-10 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
        <CheckCircle className="text-green-600 w-12 h-12" />
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left text-charcoalBlack">
          {props.WhatIsUpdated}
        </h2>
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg text-center sm:text-left text-gray-700">
        Click the button below to be redirected to the main page.
      </p>

      {/* Button */}
      <div className="flex justify-center sm:justify-start">
        <button className="px-6 py-2 bg-softRosewood text-white rounded-lg hover:bg-softRosewood/90 hover:cursor-pointer transition"
                onClick={() => {navigate(props.goTo)}}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UpdatedSuccessfully;
