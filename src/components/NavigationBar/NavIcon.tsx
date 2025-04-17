import { Link } from "react-router-dom";
interface NavIconProps {
  rightBorder?: string;
  Icon: string;
  Name: string;
  Dropdown?: string;
  pagePath: string;
}

// const navigate = useNavigate();

// const handleNavigate = (path: string) => {
//   console.log(`Navigating to ${path}`);
//   navigate(path);
// };

function NavIcon({
  rightBorder,
  Icon,
  Name,
  Dropdown,
  pagePath,
}: NavIconProps) {
  return (
    <Link
      to={pagePath}
      className={`group flex flex-col items-center justify-center w-[calc(100%/7)] sm:w-1/2 cursor-pointer ${rightBorder}`}
    >
      <i className={`${Icon} group-hover:text-black text-gray-600 text-lg`}></i>
      <span className="items-center text-xs group-hover:text-black text-gray-600 ml-1 hidden sm:flex">
        {Name}
        {Dropdown && <i className={`ml-1 ${Dropdown}`}></i>}
      </span>
    </Link>
  );
}

export default NavIcon;
