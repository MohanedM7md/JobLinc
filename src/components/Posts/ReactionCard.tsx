import { ReactionInterface } from "@interfaces/postInterfaces";
import timeDifference from "@utils/timeDifferenceCalculator";
import { HandHelping, Heart, Laugh, Lightbulb, PartyPopper, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ReactionCardProps {
  reaction: ReactionInterface;
}

export default function ReactionCard(props: ReactionCardProps) {
  const navigate = useNavigate();
  const isCompany = props.reaction.companyId ? true : false;
  const reactorId = props.reaction.companyId
    ? props.reaction.companyId
    : props.reaction.userId;
  const name = props.reaction.companyName
    ? props.reaction.companyName
    : props.reaction.firstname + " " + props.reaction.lastname;
  const picture = props.reaction.companyLogo
    ? props.reaction.companyLogo
    : props.reaction.profilePicture;

  function getReactionIcon(type: string) {
    switch (type) {
      case "Like":
        return <ThumbsUp className="text-blue-500" size={18} />;
      case "Celebrate":
        return <PartyPopper className="text-pink-500" size={18} />;
      case "Support":
        return <HandHelping className="text-green-600" size={18} />;
      case "Funny":
        return <Laugh className="text-violet-600" size={18} />;
      case "Love":
        return <Heart className="text-red-600" size={18} />;
      case "Insightful":
        return <Lightbulb className="text-yellow-600" size={18} />;
      default:
        return <ThumbsUp className="text-blue-500" size={18} />;
    }
  }

  function getReactionColor(type: string) {
    switch (type) {
      case "Like":
        return "text-blue-500";
      case "Celebrate":
        return "text-pink-500";
      case "Support":
        return "text-green-600";
      case "Funny":
        return "text-violet-600";
      case "Love":
        return "text-red-600";
      case "Insightful":
        return "text-yellow-600";
      default:
        return "text-blue-500";
    }
  }
   return (
     <div className="flex items-start w-full">
       <img className="rounded-full h-16 w-16 m-4" src={picture} alt={name} />
       <div className="mt-5 w-full min-w-0">
         <div
           onClick={() => {
             if (isCompany) {
               navigate(`/company/${reactorId}`);
             } else {
               navigate(`/profile/${reactorId}`);
             }
           }}
           className="flex flex-row justify-between w-full cursor-pointer"
         >
           <div className="flex flex-row items-center">
             <p className="mr-2 font-bold">{name}</p>
             <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
               {getReactionIcon(props.reaction.type)}
               <span
                 className={`ml-1 text-xs font-medium ${getReactionColor(props.reaction.type)}`}
               >
                 {props.reaction.type}
               </span>
             </div>
           </div>
         </div>
         <p className="truncate font-light text-mutedSilver">
           {props.reaction.headline}
         </p>
         <p className="text-sm font-medium text-gray-500">
           {timeDifference(props.reaction.time)}
         </p>
       </div>
     </div>
   );
}
