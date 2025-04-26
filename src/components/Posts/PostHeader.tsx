import { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { useNavigate } from "react-router-dom";
import timeDifference from "@utils/timeDifferenceCalculator";

interface ProfileDetailsProps {
  id: string;
  name: string;
  headline: string;
  profilePicture: string;
  isFollowing: boolean;
  time: Date;
}

export default function PostHeader(props: ProfileDetailsProps) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState<boolean>(props.isFollowing);
  const Followed = !isFollowing ? "Follow" : "Followed";

  return (
    <>
      <img
        className="rounded-full h-16 w-16 m-4"
        src={props.profilePicture}
        alt={props.name}
      />
      <div className="mt-5 w-1/1 min-w-0">
        <div className="flex flex-row justify-between w-1/1">
          <div className="flex flex-row">
            <p
              onClick={() => {
                navigate(`/profile/${props.id}`);
              }}
              className="mr-2 font-bold cursor-pointer"
            >
              {props.name}
            </p>
            <p
              className={
                isFollowing
                  ? "text-red-700 font-light cursor-pointer"
                  : "text-red-600 font-medium cursor-pointer"
              }
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {Followed}
            </p>
          </div>
        </div>
        <p className="truncate font-light text-mutedSilver">{props.headline}</p>
        <p className="text-sm font-medium text-gray-500">{timeDifference(props.time)}</p>
      </div>
    </>
  );
}
