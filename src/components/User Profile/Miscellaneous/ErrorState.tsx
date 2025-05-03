
interface ErrorStateProps {
  message?: string;
  retry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorState (props: ErrorStateProps) {
  const containerClasses = props.fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-warmWhite bg-opacity-80 z-50"
    : "flex flex-col items-center justify-center p-6 w-full";

  return (
    <div className={containerClasses}>
      <div className="bg-charcoalWhite p-6 rounded-lg shadow-md max-w-md text-center">
        <div className="material-icons text-red-500 text-4xl mb-3">
          error_outline
        </div>
        <h3 className="text-lg font-medium text-charcoalBlack mb-2">Error</h3>
        <p className="text-mutedSilver mb-4">{props.message}</p>
        {props.retry && (
          <button
            onClick={props.retry}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center mx-auto"
          >
            <span className="material-icons text-sm mr-1">refresh</span>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

