import { Edit } from "lucide-react";
export default function PageInfo() {
  return (
    <>
      <div className="flex-1 p-6 bg-warmWhite dark:bg-darkGray">
        <form>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
              Page info
            </h3>
            <p className="text-sm text-mutedSilver">* indicates required</p>

            {/* Logo section */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-charcoalBlack dark:text-charcoalWhite">
                Logo
              </label>
              <div className="mt-2 flex items-center">
                <img
                  src="/placeholder.svg"
                  alt="Company logo"
                  className="h-16 w-16 rounded-md border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  className="ml-4 rounded-full p-2 hover:bg-SoftRed dark:hover:bg-gray-800 text-mutedSilver hover:text-charcoalBlack dark:hover:text-charcoalWhite"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Name field */}
            <div>
              <label className="block text-sm font-medium mb-1 text-charcoalBlack dark:text-charcoalWhite">
                Name *
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-warmBlack text-charcoalBlack dark:text-charcoalWhite"
                maxLength={100}
              />
              <p className="text-xs text-mutedSilver mt-1">7/100</p>
            </div>

            {/* URL field */}
            <div>
              <label className="block text-sm font-medium mb-1 text-charcoalBlack dark:text-charcoalWhite">
                LinkedIn public URL *
              </label>
              <div className="flex items-center">
                <span className="text-mutedSilver mr-2">
                  linkedin.com/company/
                </span>
                <input
                  type="text"
                  className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-warmBlack text-charcoalBlack dark:text-charcoalWhite"
                />
              </div>
            </div>

            {/* Tagline field */}
            <div>
              <label className="block text-sm font-medium mb-1 text-charcoalBlack dark:text-charcoalWhite">
                Tagline
              </label>
              <textarea
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-warmBlack text-charcoalBlack dark:text-charcoalWhite"
                rows={3}
                maxLength={120}
                placeholder="Add your slogan or mission statement"
              />
              <p className="text-xs text-mutedSilver mt-1">0/120</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
