import { useLocation } from "react-router-dom";
import OTPInput from "../components/Authentication/OTPInput";
import { confirmEmail, sendConfirmationEmail } from "../store/user/userThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Authentication/Modal";
import store from "@store/store";
interface ConfirmEmailProps {
  email: string;
  token: string;
}

function ConfirmEmail() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const { email, token } = location.state as ConfirmEmailProps;

  const [redirecting, setRedirecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clearOTP, setClearOTP] = useState(false);
  const [resendToken, setResendToken] = useState("");

  async function handleSubmit(otp: string) {
    // Send OTP to server for verification
    // If OTP is correct, then set email as confirmed
    // Else, show an error message
    const userData = JSON.parse(localStorage.getItem("userState") || "" );
    const email = userData.email;
    const token = localStorage.getItem("tokenForOTP") || "";
    setClearOTP(false);
    const response = await dispatch(
      confirmEmail({ email: email, token: resendToken || token, otp: otp }),
    );
    // const response = dispatch(confirmEmail({ email: "", token: "", otp: otp}));
    if (confirmEmail.fulfilled.match(response)) {
      setRedirecting(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setIsModalOpen(true);
    }
  }

  async function handleResend() {
    setIsModalOpen(false);
    setClearOTP(true);
    const userData = JSON.parse(localStorage.getItem("userState") || "" );
    const email = userData.email;
    const response = await dispatch(sendConfirmationEmail({ email: email }));
    // const response = dispatch(sendConfirmationEmail ({ email: "" })).unwrap()
    if (sendConfirmationEmail.fulfilled.match(response)) {
      setResendToken(response.payload.token);
    } else {
      alert("An error occurred whil resending :(");
    }
  }

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {redirecting ? (
        <p>Redirecting you back to main page...</p>
      ) : (
        <div className="flex flex-col p-4 bg-lightGray rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Confirm Email</h1>
          <p className="text-[16px]">
            Please enter the OTP sent to your email.
          </p>
          <OTPInput clear={clearOTP} onComplete={handleSubmit} />
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
