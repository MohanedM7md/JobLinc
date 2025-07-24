interface ChatAvatarGridProps {
  chatPicture: string[];
  chatName: string;
}

function ChatAvatarGrid({ chatPicture, chatName }: ChatAvatarGridProps) {
  if (chatPicture == undefined) return;
  const visibleImages = chatPicture.slice(
    0,
    chatPicture.length <= 3 ? chatPicture.length : 2,
  );
  const extraCount = chatPicture.length - 3;
  return (
    <div
      className={`grid gap-1 rounded-full overflow-hidden 
        ${chatPicture.length > 2 ? "grid-cols-3" : `grid-cols-${chatPicture.length}`} 
        w-12 h-12`}
    >
      {visibleImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={chatName}
          className="w-full h-full object-cover rounded-full"
        />
      ))}
      {extraCount > 0 && (
        <div className="flex items-center justify-center tracking-tighter bg-gray-700 text-white text-sm font-bold rounded-full">
          +{extraCount + 1}
        </div>
      )}
    </div>
  );
}

export default ChatAvatarGrid;
