import UserTypingIndicator from "./UserTyping";
import { User } from "./interfaces/User.interfaces";

interface Props {
  typingUsers: string[];
  users: User[];
}

export default function TypingUsers({ typingUsers, users }: Props) {
  return (
    <>
      {typingUsers.map((typingUserId) => (
        <UserTypingIndicator
          key={typingUserId}
          userImage={
            users.find((user) => user.userId === typingUserId)?.profilePicture
          }
        />
      ))}
    </>
  );
}
