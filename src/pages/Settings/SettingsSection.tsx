import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SettingsSectionProps {
  title: string;
  items: string[];
  basePath: string;
  itemPaths: string[];
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  items,
  basePath,
  itemPaths,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      {items.map((item, index) => (
        <div 
          data-testid="dark-mode-test"
          key={index}
          className="flex justify-between items-center py-3 px-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
          onClick={() => navigate(`/settings/${basePath}/${itemPaths[index]}`)}
        >
          <span className="text-gray-700">{item}</span>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
      ))}
    </div>
  );
};

export default SettingsSection;
