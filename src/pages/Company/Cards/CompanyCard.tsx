// CompanyCard.tsx
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry?: string;
  employees?: number;
}

const CompanyCard = ({ company }: { company: Company }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 10px 25px -5px rgba(220, 38, 38, 0.08), 0 8px 10px -6px rgba(220, 38, 38, 0.01)",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="bg-charcoalWhite dark:bg-darkGray rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 
      hover:border-crimsonRed/20 cursor-pointer group"
      onClick={() => navigate(`/company/admin/${company.id}`)}
    >
      <div className="p-6 relative">
        <div className="flex items-center gap-4 mb-4">
          {company.logo ? (
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-crimsonRed dark:text-red-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite line-clamp-1 group-hover:text-crimsonRed transition-colors">
              {company.name}
            </h3>
            {company.industry && (
              <span className="text-xs px-2 py-1 bg-red-50 dark:bg-red-900/30 text-crimsonRed dark:text-red-300 rounded-full inline-block mt-1">
                {company.industry}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4 text-crimsonRed/60 dark:text-red-400/60" />
            <span>{company.employees || "0"} employees</span>
          </div>
        </div>

        <motion.div
          className="absolute bottom-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-crimsonRed dark:text-red-300"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
