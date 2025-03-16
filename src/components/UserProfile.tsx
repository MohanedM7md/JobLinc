import React from "react";
import { Img } from "react-image";
import { Link } from "react-router-dom";
interface UserProfileProps {
  userId: string;
  clasName: string;
  children: React.ReactNode;
}

function UserProfile({ userId, clasName, children }: UserProfileProps) {
  return <div className={`w-full ${clasName}`}>{children}</div>;
}

UserProfile.Image = ({
  photoUrl,
  alt,
  className,
}: {
  photoUrl: string;
  alt: string;
  className?: string;
}) => (
  <Link to="">
    <Img src={photoUrl} alt={alt} className={`rounded-full ${className}`} />
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
    <h1 className={` inline font-medium text-sm ${className}`}>{name}</h1>
  </Link>
);

UserProfile.Headline = ({
  headline,
  className,
}: {
  headline: string;
  className?: string;
}) => <p className={`text-xs text-gray-500 ${className}`}>{headline}</p>;

export default UserProfile;
