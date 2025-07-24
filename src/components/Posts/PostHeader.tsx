import "material-icons/iconfont/material-icons.css";
import { useNavigate } from "react-router-dom";
import timeDifference from "@utils/timeDifferenceCalculator";

interface ProfileDetailsProps {
  isCompany: boolean;
  id: string;
  name: string;
  headline: string;
  profilePicture: string;
  isFollowing: boolean;
  time: Date;
}

export default function PostHeader(props: ProfileDetailsProps) {
  const navigate = useNavigate();

  return (
    <>
      <img
        className="rounded-full h-16 w-16 m-4"
        src={props.profilePicture}
        alt={props.name}
      />
      <div className="mt-5 w-1/1 min-w-0">
        <div
          onClick={() => {
            if (props.isCompany) {
              navigate(`/company/member/${props.id}`);
            }
            else {
              navigate(`/profile/${props.id}`)
            }
          }}
          className="flex flex-row justify-between w-1/1 cursor-pointer"
        >
          <div className="flex flex-row">
            <p className="mr-2 font-bold">{props.name}</p>
          </div>
        </div>
        <p className="truncate font-light text-mutedSilver">{props.headline}</p>
        <p className="text-sm font-medium text-gray-500">
          {timeDifference(props.time)}
        </p>
      </div>
    </>
  );
}
