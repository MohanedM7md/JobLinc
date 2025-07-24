import SignHeader from "../components/Authentication/Headers/SignHeader";
import NameFieldNormal from "../components/Authentication/Utilities/NameFieldNormal";
import { useState } from "react";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";

function UpdateUsername()
{

    const [showErrorUsernameEmpty, setshowErrorUsernameEmpty] = useState(false);
    const [showErrorUsernameInvalid, setshowErrorUsernameInvalid] = useState(false);

    const [username, setUsername] = useState("");
    function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!showErrorUsernameEmpty && !showErrorUsernameInvalid) {
            console.log("Username Updated");

            // Add logic here to update username
        }
    }
    {

    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white"> 
            <SignHeader />
            <form onSubmit={isValidSubmit} className="flex flex-col w-80 items-start gap-3 mb-3 bg-lightGray p-5 rounded-xl">
                <NameFieldNormal labelText="Username *" name="username" val={username} setVal={setUsername} showErrorEmpty={showErrorUsernameEmpty} setShowErrorEmpty={setshowErrorUsernameEmpty} showErrorInvalid={showErrorUsernameInvalid} setShowErrorInvalid={setshowErrorUsernameInvalid}/>
                <AuthenticationSignInButton id="update-username-btn" text="Update Username"/>
            </form>
        </div>
    );
}

export default UpdateUsername;