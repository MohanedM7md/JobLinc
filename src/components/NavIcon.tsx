interface NavIconProps {
  rightBorder?: string;
  Icon: string;
  Name: string;
  Dropdown?: string;
}

function NavIcon(props: NavIconProps) {
  return (
    <div
      className={`group flex flex-col items-center justify-center w-[calc(100%/7)] sm:w-1/2 cursor-pointer ${props.rightBorder}`}
    >
      <i className={`${props.Icon} group-hover:text-black text-gray-600 text-lg`}></i>
      <span className="items-center text-xs group-hover:text-black text-gray-600 ml-1 hidden sm:flex">
        {props.Name}
        {props.Dropdown && <i className={`ml-1 ${props.Dropdown}`}></i>}
      </span>
    </div>
  );
}

export default NavIcon;
