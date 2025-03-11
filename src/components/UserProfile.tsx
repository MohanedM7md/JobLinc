import React from "react";
import { Img } from "react-image";
import { Link } from "react-router-dom";
interface UserProfileProps {
  userId: string;
  clasName: string;
  children: React.ReactNode;
}

function UserProfile({ userId, clasName, children }: UserProfileProps) {
  return <div className={`${clasName}`}>{children}</div>;
}

UserProfile.Image = ({
  photoUrl,
  userName,
  className,
}: {
  photoUrl: string;
  userName: string;
  className?: string;
}) => (
  <Link to="">
    <Img
      src={photoUrl}
      alt={userName}
      className={`rounded-full ${className}`}
    />
  </Link>
);

UserProfile.Name = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => (
  <Link to="">
    <h1 className={`font-medium text-sm ${className}`}>{name}</h1>
  </Link>
);

UserProfile.Headline = ({
  headline,
  className,
}: {
  headline: string;
  className?: string;
}) => <p className={`text-xs text-gray-500 ${className}`}>{headline}</p>;
