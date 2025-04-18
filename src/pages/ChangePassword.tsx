import SignHeader from "../components/Authentication/Headers/SignHeader";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import { useState, useEffect } from "react";
import store from "../store/store";
import { changePassword } from "../store/user/userThunks";
import { ChevronLeftIcon } from "lucide-react";


import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

import { useNavigate } from "react-router-dom";

import Modal from "../components/Authentication/Modal";
import { Link } from "react-router-dom";

import PasswordFieldNormal from "../components/Authentication/Utilities/PasswordFieldNormal";
import { isValidPassword } from "../components/Authentication/Utilities/Validations";

import UpdatedSuccessfully from "../components/Authentication/Utilities/UpdatedSuccessfully";
import UpdateFailed from "../components/Authentication/Utilities/UpdateFailed";
function ChangePassword() {
  const [oldPassText, setOldPassText] = useState("");
  const [newPassText, setNewPassText] = useState("");

  const [showErrorOldPassEmpty, setShowErrorOldPassEmpty] = useState(false);
  const [showErrorOldPassInvalid, setShowErrorOldPassInvalid] = useState(false);

  const [showErrorNewPassEmpty, setShowErrorNewPassEmpty] = useState(false);
  const [showErrorNewPassInvalid, setShowErrorNewPassInvalid] = useState(false);

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  async function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isValidPassword(oldPassText) && isValidPassword(newPassText)) {
      if (oldPassText !== newPassText) {
        const userData = {
          oldPassword: oldPassText,
          newPassword: newPassText,
          refreshToken: localStorage.getItem("refreshToken") || "",
        };
        console.log(
          "store status before changing password: " +
            JSON.stringify(store.getState().user),
        );
        const response = await dispatch(changePassword(userData));

        console.log("response: " + JSON.stringify(response));
        if (changePassword.fulfilled.match(response)) {
          // Redirect to the Home Page
          console.log(
            "store status after changing password: " +
              JSON.stringify(store.getState().user),
          );
          setIsModalSuccessOpen(true);
        } else {
          setIsModalErrorOpen(true);
        }
      } else {
        setShowError(true);
      }
    }
  }

  return (
    <div className="bg-white rounded-xl flex flex-col gap-4 p-6 w-[1000px] shadow-md border border-gray-200">
      <div
        className="flex items-center w-[60px] hover:underline hover:cursor-pointer"
        onClick={() => {
        navigate("/settings/sign-in-security");
        }}>
        <ChevronLeftIcon />
        <span>Back</span>
      </div>

      {isModalSuccessOpen ? (
        <UpdatedSuccessfully WhatIsUpdated="Password updated successfully!" goTo="/home" />
      ) : isModalErrorOpen ? (
        <UpdateFailed
          WhatFailed="Password update failed"
          errorText="Old password is incorrect. Did you forget your password?"
          setVisible={setIsModalErrorOpen}
          helperText="Forgot Password"
          goTo="/signin/forgot-password"
        />
      ) : (
        <form onSubmit={isValidSubmit}>
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h1 className="text-xl font-bold text-neutral-800">Change Password</h1>

            <PasswordFieldNormal
              labelText="Old password *"
              passwordText={oldPassText}
              setPasswordText={setOldPassText}
              showErrorPassEmpty={showErrorOldPassEmpty}
              setshowErrorPassEmpty={setShowErrorOldPassEmpty}
              showErrorPassInvalid={showErrorOldPassInvalid}
              setshowErrorPassInvalid={setShowErrorOldPassInvalid}
            />

            <PasswordFieldNormal
              labelText="New password *"
              passwordText={newPassText}
              setPasswordText={setNewPassText}
              showErrorPassEmpty={showErrorNewPassEmpty}
              setshowErrorPassEmpty={setShowErrorNewPassEmpty}
              showErrorPassInvalid={showErrorNewPassInvalid}
              setshowErrorPassInvalid={setShowErrorNewPassInvalid}
            />

            {showError && (
              <p data-testid="errorLogical" className="text-sm text-red-700 mt-[-10px]">
                New password can't be the same as old password.
              </p>
            )}

            <div className="pt-2">
              <AuthenticationSignInButton id="done-btn" text="Done" />
            </div>
          </div>
        </form>
      )}
</div>

  );
}

export default ChangePassword;
