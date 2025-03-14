import { useEffect, useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUser } from "../../store/userSlice";

// Define types for the props
interface ProfileDetailsProps {
  isLincing: boolean;
}

export default function ProfileDetails(props: ProfileDetailsProps) {
  const [isLinc, setIsLinc] = useState<boolean>(props.isLincing);
  const Linc = !isLinc ? "Linc" : "Linc'd";
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser()); // Load user data on mount
    }, [dispatch]);
  
    return (
    <>
      <img
        className="rounded-full h-16 w-16 m-4"
        src={user.profilePicture ?? ""}
        alt={user.name ?? ""}
      />
      <div className="mt-5 w-1/1 min-w-0">
        <div className="flex flex-row justify-between w-1/1">
          <div className="flex flex-row">
            <p className="mr-2 font-bold">{user.name}</p>
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
        <p className="truncate font-light text-mutedSilver">{user.title}</p>
      </div>
    </>
  );
}
