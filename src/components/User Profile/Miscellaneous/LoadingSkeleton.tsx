import { memo } from "react";

interface LoadingSkeletonProps {
  count?: number;
}

function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <div className="bg-warmWhite h-full min-h-dvh w-1/1">
      <div className="bg-charcoalWhite my-2 p-4 rounded-lg shadow-md relative w-12/12 lg:w-6/12 m-auto animate-pulse">
        <div className="my-2 p-4 rounded-lg relative w-full">
          <div className="flex flex-row justify-between items-center mb-6">
            <div className="bg-gray-300 h-6 w-32 rounded"></div>
            <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
          </div>

          {Array(count)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-row mx-1">
                  <div className="flex flex-col w-full">
                    <div className="bg-gray-300 h-5 w-48 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-36 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-56 rounded"></div>
                  </div>
                </div>
                {index < count - 1 && (
                  <div className="border-b border-gray-300 w-11/12 mx-auto mt-4 mb-4"></div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default memo(LoadingSkeleton);
