import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ProfileProps {
  userId: string;
  firstname: string;
  lastname: string;
  headline: string;
  profilePicture: string;
}

export default function MiniProfileHeader(props: ProfileProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-charcoalWhite cursor-pointer sticky top-0 z-10 overflow-hidden"
      onClick={() => navigate(`/profile/${props.userId}`)}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row items-center justify-center p-2">
        <img
          className="rounded-full h-10 w-10"
          src={props.profilePicture}
          alt={`profile picture of ${props.firstname}`}
        />
        <div className="ml-3 text-center">
          <span className="block font-medium">
            {props.firstname} {props.lastname}
          </span>
          <span className="block text-sm text-mutedSilver">
            {props.headline}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
