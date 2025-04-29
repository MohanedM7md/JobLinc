export default function LoadingChatCard() {
  return (
    <div
      className="flex items-center p-3 relative rounded-lg shadow-sm 
                animate-pulse bg-charcoalWhite w-full"
    >
      <div className="relative w-12 h-12 shrink-0 rounded-full bg-gray-300" />

      <div className="flex flex-1 justify-between items-center ml-3 overflow-hidden">
        <div className="flex flex-col gap-2 w-full overflow-hidden">
          <div className="h-4 bg-gray-300 rounded w-1/2" />

          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>

        <div className="flex items-center gap-2 min-w-[60px] justify-end ml-2">
          <div className="h-3 bg-gray-200 rounded w-12" />

          <div className="w-5 h-5 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
