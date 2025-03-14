import { useState } from "react";
import "material-icons/iconfont/material-icons.css";

// Define types for the props
interface ProfileDetailsProps {
  img: string;
  name: string;
  title: string;
  isLincing: boolean;
}

export default function ProfileDetails(props: ProfileDetailsProps) {
  const [isLinc, setIsLinc] = useState<boolean>(props.isLincing);
  const Linc = !isLinc ? "Linc" : "Linc'd";

  return (
    <>
      <img
        className="rounded-full h-16 w-16 m-4"
        src={props.img}
        alt={props.name}
      />
      <div className="mt-5 w-1/1 min-w-0">
        <div className="flex flex-row justify-between w-1/1">
          <div className="flex flex-row">
            <p className="mr-2 font-bold">{props.name}</p>
            <p
              className={
                isLinc
                  ? "text-red-700 font-light cursor-pointer"
                  : "text-red-600 font-medium cursor-pointer"
              }
              onClick={() => setIsLinc(!isLinc)}
            >
              {Linc}
            </p>
          </div>
        </div>
        <p className="truncate font-light text-mutedSilver">{props.title}</p>
      </div>
    </>
  );
}
