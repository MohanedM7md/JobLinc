import { NetWorkCard } from "./interfaces/Chat.interfaces";
export default function NetworkCard({
  userId,
  chatPicture,
  chatName,
  onClick,
  className = "w-full",
}: NetWorkCard) {
  return (
    <div
      onClick={onClick}
      id={userId}
      className={`
        flex items-center justify-center p-2 mb-1 cursor-pointer  rounded-2xl ${className}`}
    >
      <div className="relative w-12 h-12 group grid grid-cols-1 grid-rows-1 items-center">
        <img
          className="col-start-1 row-start-1 rounded-full w-full h-full object-fit"
          alt={chatName}
          src={chatPicture}
        />
      </div>
      <div className="hidden md:block font-medium flex-1 ml-3">
        <div className="">{chatName}</div>
      </div>
    </div>
  );
}
