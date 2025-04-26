import timeDifference from "@utils/timeDifferenceCalculator";

interface CommenterProps {
  userId: string;
  name: string;
  profilePicture: string;
  headline: string;
  time: Date;
}

export default function CommenterDetails(props: CommenterProps) {
  return (
    <>
      <img
        className="rounded-full h-10 w-10 m-2"
        src={props.profilePicture}
        alt={props.name}
      />
      <div className="mt-2 w-1/1 min-w-0">
        <div className="flex flex-row justify-between w-1/1">
          <div className="flex flex-row">
            <p className="mr-2 font-bold text-sm">{props.name}</p>
          </div>
        </div>
        <p className="truncate font-light text-mutedSilver text-sm">
          {props.headline}
        </p>
        <p className="text-sm font-medium text-gray-500">
          {timeDifference(props.time)}
        </p>
      </div>
    </>
  );
}
