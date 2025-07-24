import { Link } from "react-router-dom";

interface ManageNetworkIconsProps {
  id:string;
  Icon: string;
  IconName: string;
  Number?: string;
  link?: string;
}

const ManageNetworkIcons: React.FC<ManageNetworkIconsProps> = (prop) => {
  return (
    <Link data-testid="link-id" to={prop.link || "#"} className="flex justify-between items-center text-gray-500 hover:bg-gray-100 p-2 cursor-pointer">
      <span className="flex items-center">
        <i className={`${prop.Icon} text-center w-7 text-xl`}></i>
        <span className="ml-1 font-semibold text-md">{prop.IconName}</span>
      </span>
      <span className="text-md">{prop.Number}</span>
    </Link>
  );
};

export default ManageNetworkIcons;
