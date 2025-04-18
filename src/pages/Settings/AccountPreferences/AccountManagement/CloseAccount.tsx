import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { logOut } from "@store/user/userSlice";
import store from "@store/store";
import ConfirmationModal from "../../../../components/Authentication/Utilities/ConfirmationModal";

function CloseAccount() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [displayWarning, setDisplayWarning] = useState(false);

  function handleClick() {
    setDisplayWarning(true);
  }
  function handleDelete() {
    dispatch(logOut());
    navigate("/home");
  }

  const user = store.getState().user;
  return (
    <div className="bg-white rounded-xl flex flex-col gap-4 p-6 w-[1000px]">
      {displayWarning ? (
        <ConfirmationModal
          message="If you press continue, your account will be deleted permanently"
          onConfirm={handleDelete}
          onCancel={() => {
            setDisplayWarning(false);
          }}
        />
      ) : (
        <div>
          <div
            className="flex items-center w-[60px] hover:underline hover:cursor-pointer mb-5"
            onClick={() => {
              navigate("/settings/account-preferences");
            }}
          >
            <ChevronLeftIcon />
            <p>Back</p>
          </div>

          <div className="mb-5 flex flex-col gap-2">
            <h3 className="font-semibold text-[20px]">Close Account</h3>
            <p>{user.firstname}, we are sorry to see you go</p>
            <p>
              Just a quick reminder, closing your account means you will lose
              touch with your connections.
            </p>
            <p>
              You will also lose any recommendations and endorsements you have
              given or received.
            </p>
          </div>

          <div>
            <button onClick={handleClick} className="w-[100px] bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CloseAccount;
