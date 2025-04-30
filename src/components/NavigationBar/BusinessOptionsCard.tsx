import { Building2, Eye, Briefcase, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface BusinessOption {
  icon: React.ElementType;
  title: string;
  path: string;
  description: string;
}

const businessOptions: BusinessOption[] = [
  {
    icon: Building2,
    title: "Create company",
    path: "/company/setup/new",
    description: "Start your company presence",
  },
  {
    icon: Eye,
    title: "View my company",
    path: "/company/my-companies",
    description: "Check profile & analytics",
  },
  {
    icon: Briefcase,
    title: "Post jobs",
    path: "/jobs/create",
    description: "Create job listings",
  },
  {
    icon: Star,
    title: "Go Premium",
    path: "/premium",
    description: "Unlock advanced features",
  },
];

export function BusinessOptionsCard() {
  return (
    <div className="mr-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-crimsonRed text-base font-semibold">
          Business Options
        </h2>
      </div>

      <div className="p-2">
        {businessOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              to={option.path}
              key={option.title}
              className="flex items-center gap-3 px-2 py-2.5 rounded-md
                      hover:bg-gray-50 w-full text-left"
            >
              <Icon className="w-5 h-5 text-crimsonRed flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm text-gray-800">
                  {option.title}
                </h3>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
