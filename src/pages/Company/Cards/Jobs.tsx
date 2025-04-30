import { Bell } from "lucide-react";
import { Briefcase } from "lucide-react";



function Jobs()
{
    return (

        <div className="flex flex-col gap-5">
            
            {/* If no jobs are made then this component will be rendered otherwise I should remove it*/}
            <div className="flex justify-between bg-white p-5 rounded-xl">
                <div className="flex gap-2">
                    <Bell />    
                    <p> Create job alert for JobLinc</p>
                </div>
                <button>Create job alert</button>
            </div>

            <div className="flex flex-col bg-white gap-3 items-center p-10 rounded-xl">
                <Briefcase size={64} />
                <p className="text-[20px]">There are no jobs right now.</p>
                <p>Create a job alert and we'll let you know when relevant jobs are posted.</p>
            </div>

        </div>
    );
}

export default Jobs;