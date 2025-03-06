import { Img } from "react-image";

const messages = [
  { id: 1, sender: "Alice", text: "Hey, how are you?" },
  { id: 2, sender: "Bob", text: "I'm good! What about you?" },
  { id: 3, sender: "Alice", text: "Doing great, thanks!" },
];

const UserImage = "./src/components/chat/premium.jpeg";
export const ChatSideBar = () => {
  return (
    <div
      className="w-72 h-10 fixed bottom-0 right-4 bg-lightGray
                shadow-[0px_4px_10px_rgba(0,0,0,0.15)] 
                shadow-gray-500 rounded-t-lg
                md:block hidden"
    >
      <header className="flex items-center gap-x-4 cursor-pointer">
        <div className="flex items-center rounded-t-lg shadow-2xl gap-x-4">
          <Img src={UserImage} alt="User Avata" className="rounded-full w-14" />
          <div>Messaging</div>
        </div>
        <div className="flex"></div>
      </header>
    </div>
  );
};
