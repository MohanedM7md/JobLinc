import { Company } from "@store/comapny/interfaces";
import LocationMap from "./LocationMap";
import { MapPinIcon } from "@heroicons/react/24/outline"; // Assuming you're using Heroicons

type OverviewProps = {
  company?: Company;
};

function Overview(props: OverviewProps) {
  const date = new Date(props.company?.createdAt || "");
  const formattedDate = date.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="flex flex-col gap-5 mt-10">
      {/* Overview Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Company Overview</h2>
        {props.company && (
          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">{props.company.overview}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Website */}
              {props.company.website && (
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Website</label>
                  <a 
                    href={props.company.website} 
                    className="text-blue-600 hover:underline break-all"
                  >
                    {props.company.website}
                  </a>
                </div>
              )}

              {/* Industry */}
              {props.company.industry && (
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Industry</label>
                  <p className="font-medium">{props.company.industry}</p>
                </div>
              )}

              {/* Company Size */}
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">Company Size</label>
                <p className="font-medium">{props.company.employees} employees</p>
              </div>

              {/* Founded */}
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">Founded</label>
                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Locations Section */}
      {props.company?.locations !== undefined && props.company?.locations?.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPinIcon className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-semibold text-gray-900">Headquarters</h2>
          </div>
          
          <div className="space-y-6">
            {props.company.locations.map((location) => (
              <div key={location.id} className={`flex flex-col md:flex-row gap-6 border-b-1 border-b-gray-600 pb-5`}>
                {/* Address Details */}
                <div className="flex-1 space-y-2">
                  <div className="space-y-1">
                    {location.address && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="font-medium text-gray-900">{location.address}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Country</label>
                        <p className="font-medium text-gray-900">{location.country}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">City</label>
                        <p className="font-medium text-gray-900">{location.city}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Integration */}
                <div className="flex-1 h-64 rounded-lg overflow-hidden border border-gray-200">
                  <LocationMap 
                    country={location.country} 
                    city={location.city} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;