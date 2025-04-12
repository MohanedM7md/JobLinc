import { useState } from "react";
interface ProfilePictureProps {
    lincbuttonid:string;
    profilePicture: string;
    userName:string;
    userBio:string;
    Mutuals:string;

  }

  function ConnectCard(props: ProfilePictureProps) {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  
    return (
      <div className="border-2 border-gray-200 rounded-xl flex-col w-57 h-80 justify-center items-center cursor-pointer">
        <div className="relative flex flex-col w-full h-7/20 justify-center items-center">
          <img
            src={props.profilePicture}
            alt="User Profile Photo"
            className="absolute w-29 h-29 rounded-full top-7/20 object-cover shadow-sm"
          ></img>
          <img
            src="src/assets/Cinema.jpg"
            alt="Cover Image"
            className="w-full h-full border-b-1 border-gray-300 rounded-t-lg"
          ></img>
        </div>
        <div className="relative flex flex-col w-full h-13/20 justify-around items-center">
          <div className="flex flex-col w-full justify-center items-center mt-12">
            <p className="font-semibold text-md text-center">{props.userName}</p>
            <p className="line clamp-2 text-gray-500 text-md text-center">
              {props.userBio}
            </p>
          </div>
          <div className="flex w-full justify-center items-center">
            <p className="flex items-center space-x-2">
              <img
                src={props.profilePicture}
                alt="Mutual Friend Photo"
                className="w-8 h-8 rounded-full top-1/5 object-cover shadow-sm"
              ></img>
              <span className="line-clamp-3 text-xs text-gray-500 ">
                {props.Mutuals}
              </span>
            </p>
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <button
              id={props.lincbuttonid}
              onClick={handleClick}
              className={`border-2 px-15 py-0.5 ${
                isClicked
                  ? "text-darkGray border-darkGray"
                  : "text-crimsonRed border-crimsonRed"
              } rounded-full font-semibold hover:bg-lightGray hover:outline-1`}
            >
              <i
                className={`${
                  isClicked ? "fa-regular fa-clock" : "fa-solid fa-user-plus"
                } mr-1`}
              ></i>
              {isClicked ? "Pending" : "Linc"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default ConnectCard;