import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import CompanyJobs from "../../../components/Company/Jobs/CompanyJobs";
import { fetchCompanyJobs } from "@services/api/jobService";
import { useCompanyStore } from "@store/comapny/companyStore";
import { Job } from "../../../components/Company/Jobs/CompanyJobs";

export default function Jobs() {
  const { company } = useCompanyStore();
  const companyId = company?.id;
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loadJobs = async () => {
      if (!companyId) return;
      const result = await fetchCompanyJobs(companyId);
      setCompanyJobs(result.jobs);
    };
    loadJobs();
  }, [companyId]);

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto w-full mt-10">
      {companyJobs.length > 0 ? (
        <CompanyJobs />
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
            <div className="mb-6 text-crimsonRed">
              <Briefcase className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Current Job Listings
            </h3>
          </div>
        </>
      )}
    </div>
  );
}
