import SignHeader from "../components/Authentication/Headers/SignHeader";
import EmailFieldNormal from "../components/Authentication/Utilities/EmailFieldNormal";
import { useState } from "react";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
function UpdateEmail()
{
    const [emailText, setEmailText] = useState("");
    const [showErrorEmailEmpty, setshowErrorEmailEmpty] = useState(false);
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);

    function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!showErrorEmailEmpty && !showErrorEmailInvalid) {
            console.log("Email Updated");

            // Add logic here to update email
            // Most likely will need to dispatch an action to get the access token from the store and then send a request to the server to update the email
        }
    }
    {

    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white"> 
            <SignHeader />
            <form onSubmit={isValidSubmit} className="flex flex-col w-80 items-start gap-3 mb-3 bg-lightGray p-5 rounded-xl">
                <EmailFieldNormal emailText={emailText} setEmailText={setEmailText} showErrorEmailEmpty={showErrorEmailEmpty} setshowErrorEmailEmpty={setshowErrorEmailEmpty} showErrorEmailInvalid={showErrorEmailInvalid} setshowErrorEmailInvalid={setshowErrorEmailInvalid} />
                <AuthenticationSignInButton id="update-email-btn" text="Update Email"/>
            </form>
        </div>
    );
    
}

export default UpdateEmail;
