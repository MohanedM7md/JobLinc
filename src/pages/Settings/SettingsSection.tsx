import { ChevronRight } from "lucide-react"

interface SettingsSectionProps {
    title: string;
    items: string[];
}


const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-bold mb-3">{title}</h3>
            {items.map((item: string, index: number) => (
                <div key={index} className="flex justify-between items-center py-3 px-2 border-b last:border-none cursor-pointer hover:bg-gray-100">
                    <span className="text-gray-700">{item}</span>
                    <ChevronRight size={20} className="text-gray-400" />
                </div>
            ))}
        </div>
    );
}

export default SettingsSection;