import { Building2, Eye, Briefcase, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    path: "/company/view",
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
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
      <div className="bg-gradient-to-r border-crimsonRed border-1 px-5 py-3">
        <h2 className="text-crimsonRed text-lg font-semibold">
          Business Options
        </h2>
      </div>

      <div className="p-3">
        <div className="space-y-2">
          {businessOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                to={option.path}
                key={option.title}
                className="flex items-center gap-3 p-3 rounded-md transition-colors
                          hover:bg-gray-50 w-full text-left group"
              >
                <div className="p-2 rounded-full bg-crimsonRed/10 group-hover:bg-crimsonRed/20">
                  <Icon className="w-5 h-5 text-crimsonRed" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-800 truncate">
                    {option.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {option.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
