import { useMemo } from "react";
export default function ModalSidebar() {
  interface MenuItem {
    [key: string]: string[];
  }

  const mainMenuItems: MenuItem[] = [
    { header: ["Page info"] },
    { About: ["Details", "Locations"] },
  ];
  return (
    <>
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 bg-lightGray dark:bg-darkGray">
        {mainMenuItems.map((item) => (
          <>
            {Object.entries(item).map(([key, values]) => (
              <>
                <h3 className="px-4 py-2 text-sm font-medium text-mutedSilver">
                  {key}
                </h3>

                {values.map((value) => (
                  <button className="w-full px-4 py-2 text-left hover:bg-SoftRed dark:hover:bg-gray-800 text-charcoalBlack dark:text-charcoalWhite">
                    {value}
                  </button>
                ))}
              </>
            ))}
          </>
        ))}
      </div>
    </>
  );
}
