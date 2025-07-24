import { Bell, Briefcase } from "lucide-react";

function Jobs() {
    return (
        <div className="flex flex-col gap-5 max-w-4xl mx-auto w-full mt-10">
            {/* Job Alert Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <Bell className="w-6 h-6 text-crimsonRed" />
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Job Alerts
                        </label>
                        <p className="text-gray-900 font-medium">
                            Create personalized job alerts for JobLinc
                        </p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-crimsonRed text-white rounded-lg hover:bg-crimsonRed/90 hover:cursor-pointer transition-colors text-sm font-medium whitespace-nowrap">
                    Create Job Alert
                </button>
            </div>

            {/* Empty State */}
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
                <div className="mb-6 text-crimsonRed">
                    <Briefcase className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    No Current Job Listings
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We'll notify you when new positions matching your preferences become available.
                </p>
                <button className="px-6 py-2.5 bg-crimsonRed text-white rounded-lg hover:bg-crimsonRed/90 hover:cursor-pointer transition-colors text-sm font-medium">
                    Set Up Job Alerts
                </button>
            </div>
        </div>
    );
}

export default Jobs;