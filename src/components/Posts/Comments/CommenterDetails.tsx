import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchUser } from "../../../store/userSlice";



export default function CommenterDetails() {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    useEffect(() => {
      dispatch(fetchUser()); // Load user data on mount
    }, [dispatch]);
  return (
    <>
      <img
        className="rounded-full h-10 w-10 m-2"
        src={user.profilePicture ?? ""}
        alt={user.name ?? ""}
      />
      <div className="mt-2 w-1/1 min-w-0">
        <div className="flex flex-row justify-between w-1/1">
          <div className="flex flex-row">
            <p className="mr-2 font-bold text-sm">{user.name}</p>
          </div>
        </div>
        <p className="truncate font-light text-mutedSilver text-sm">{user.headline}</p>
      </div>
    </>
  );
}
