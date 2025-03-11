import React from "react";
import { Img } from "react-image";
interface UserProfileProps {
  clasName: string;
  children: React.ReactNode;
}

function UserProfile({ clasName, children }: UserProfileProps) {
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
  <Img src={photoUrl} alt={userName} className={`rounded-full ${className}`} />
);

UserProfile.Name = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => <h1 className={`font-medium text-sm ${className}`}>{name}</h1>;

UserProfile.Headline = ({
  headline,
  className,
}: {
  headline: string;
  className?: string;
}) => <p className={`text-xs text-gray-500 ${className}`}>{headline}</p>;
