const SkeletonMessageBubble = () => (
  <div className="flex items-start gap-3 animate-pulse pl-1">
    <div className="w-10 h-10 bg-gray-300 rounded-full" />
    <div className="flex flex-col gap-2 w-full">
      <div className="h-4 w-24 bg-gray-300 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
    </div>
  </div>
);
export default SkeletonMessageBubble;
