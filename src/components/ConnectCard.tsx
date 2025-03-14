import { useState } from "react";
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
        <div className="border flex flex-col w-100 h-50 justify-center items-center">
                <img src={props.profilePicture} className="border w-29 h-28 rounded-full "></img>
                <p className="font-semibold">{props.userName}</p>
                <p>{props.userBio}</p>
                <button
                onClick={handleClick}
                className={`border-2 px-15 py-0.5 ${isClicked ? "text-darkGray border-darkGray" : "text-crimsonRed border-crimsonRed"} rounded-full font-semibold `}>
                <i className={`${isClicked ? "fa-regular fa-clock":"fa-solid fa-user-plus"} mr-1`}></i>  
                {isClicked ? "Pending" : "Linc"}
                </button>
        </div>
    );
}
export default ConnectCard