
export default function FullActivityLoading() {
  return (
    <div className="w-full">
      <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white w-12/12 m-auto flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="h-7 w-24 bg-gray-600 rounded animate-pulse mb-4"></div>
          <div className="h-8 w-8 bg-gray-600 rounded-full animate-pulse -mt-5"></div>
        </div>

        <div className="w-full">
          <div className="flex flex-col relative h-full w-full">
            <div className="flex flex-row w-full mb-3">
              <div className="h-12 w-12 bg-gray-600 rounded-full animate-pulse mr-3"></div>
              <div className="flex flex-col flex-grow">
                <div className="h-5 w-1/3 bg-gray-600 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/4 bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="flex-grow mb-4">
              <div className="h-4 w-full bg-gray-600 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-600 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-600 rounded animate-pulse mb-4"></div>
              <div className="h-48 w-full bg-gray-600 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-row py-2 w-11/12 m-auto border-b border-gray-500 mb-2">
              <div className="h-5 w-12 bg-gray-600 rounded animate-pulse"></div>
              <div className="flex flex-row justify-end w-full">
                <div className="h-5 w-24 bg-gray-600 rounded animate-pulse ml-auto"></div>
              </div>
            </div>

            <div className="flex flex-grow-0 relative justify-between">
              <div className="h-8 w-20 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
