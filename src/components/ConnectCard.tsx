import { useState } from "react";
import UserProfile from "./UserProfile";
interface ProfilePictureProps {
    profilePicture: string;
    userName:string;
    userBio:string;

  }

function ConnectCard(props:ProfilePictureProps){
const [isClicked, setIsClicked] = useState(false);

const handleClick = () => {
    setIsClicked(!isClicked);
};
    return(
        <div className="border-2 border-gray-200 rounded-xl flex flex-col w-70 h-80 justify-center items-center">
            <div className="relative flex flex-col w-full h-7/20 justify-center items-center">
                {/* <UserProfile.Image
                photoUrl={props.profilePicture}
                userName={props.userName}
                className="absolute w-29 h-29 rounded-full top-7/20 object-cover shadow-sm"
                /> */}
                <img src={props.profilePicture}
                alt= "Profile Photo" 
                className="absolute w-29 h-29 rounded-full top-7/20 object-cover shadow-sm"></img>
                <img
                src="src\assets\Cinema.jpg"
                alt="Cover Image"
                className="w-full h-full border-b-1 border-gray-300"
                />
            </div>
            <div className=" relative flex flex-col w-full h-13/20 justify-center items-center">
                <p className="font-semibold ">{props.userName}</p>
                <p>{props.userBio}</p>
                <p className="">mutuals will apear here</p>
                <button
                onClick={handleClick}
                className={`border-2 px-15 py-0.5 ${isClicked ? "text-darkGray border-darkGray" : "text-crimsonRed border-crimsonRed"} rounded-full font-semibold hover:bg-lightGray hover:border-3`}>
                <i className={`${isClicked ? "fa-regular fa-clock":"fa-solid fa-user-plus"} mr-1`}></i>  
                {isClicked ? "Pending" : "Linc"}
                </button>
            </div>
        </div>
    );
}
export default ConnectCard