import { useLocation } from "react-router-dom";
import OTPInput from "../components/Authentication/OTPInput";
import { confirmEmail, sendConfirmationEmail } from "../store/user/userThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Authentication/Modal";
import store from "@store/store";
import { ChevronLeftIcon } from "lucide-react";
import UpdatedSuccessfully from "../components/Authentication/Utilities/UpdatedSuccessfully";
type ConfirmEmailProps = {
  tokenForOTP: string;
  setIsConfirmClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmEmail(props: ConfirmEmailProps) {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const { email, token } = location.state as ConfirmEmailProps;

  const [redirecting, setRedirecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clearOTP, setClearOTP] = useState(false);
  const [resendToken, setResendToken] = useState("");
  const user = store.getState().user;


  async function handleSubmit(otp: string) {
    // Send OTP to server for verification
    // If OTP is correct, then set email as confirmed
    // Else, show an error message
    const email = user.email;
    const token = props.tokenForOTP;
    setClearOTP(false);
    const response = await dispatch(
      confirmEmail({ email: email || "", token: resendToken || token, otp: otp }),
    );
    // const response = dispatch(confirmEmail({ email: "", token: "", otp: otp}));
    if (confirmEmail.fulfilled.match(response)) {
      setRedirecting(true);
    } else {
      setIsModalOpen(true);
    }
  }

  async function handleResend() {
    setIsModalOpen(false);
    setClearOTP(true);
    const email = user.email;
    const response = await dispatch(sendConfirmationEmail({ email: email || "" }));
    // const response = dispatch(sendConfirmationEmail ({ email: "" })).unwrap()
    if (sendConfirmationEmail.fulfilled.match(response)) {
      setResendToken(response.payload.token);
    } else {
      alert("An error occurred whil resending :(");
    }
  }

  return (
    <div className="flex w-full mt-10 items-center justify-center">
      {redirecting ? (
        <UpdatedSuccessfully WhatIsUpdated="Email confirmed successfully!" goTo="/home"/>
      ) : (
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center w-[60px] hover:underline hover:cursor-pointer" onClick={() => {props.setIsConfirmClicked(false)}}>
              <ChevronLeftIcon/>
              <p>Back</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Confirm Email</h1>
            <p className="text-[16px]">
              Please enter the OTP sent to your email.
            </p>
            <OTPInput clear={clearOTP} onComplete={handleSubmit} />
          </div>  
        </div>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setClearOTP(true);
          }}
        >
          <h1 className="text-2xl font-bold">Wrong OTP entered</h1>
          <p
            onClick={handleResend}
            className="text-[16px] hover:underline hover:cursor-pointer"
          >
            Resend confirmation email
          </p>
        </Modal>
      )}
    </div>
  );
}

export default ConfirmEmail;
