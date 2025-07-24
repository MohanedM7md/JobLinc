export interface searchUserInterface {
  userId: string;
  firstname: string;
  lastname: string;
  username: string;
  profilePicture: string;
  country: string;
  city: string;
  connectionStatus: "Accepted" | "Received" | "Sent" | "NotConnected" | "Canceled" | "Blocked" | "Unblocked";
  isFollowing: boolean;
  numberOfConnections: number;
  mutualConnections: number;
  skills: string[];
  experiences: string[];
  certificates: string[];
}
export interface connectsInterface {
    userId: string;
    profilePicture: string,
    firstName: string,
    lastName: string,
    headline: string,
    Mutuals: Number;
  }
export interface invitationInterface {
    userId: string;
    profilePicture: string;
    firstname: string;
    lastname: string;
    headline: string;
    mutualConnections: Number;
    connectionStatus?: "Accepted" | "Sent" | "Received" | "NotConnected";
  }
  export interface ConnectionInterface {
    userId: string;
    profilePicture: string;
    firstname: string;
    lastname: string;
    headline: string;
    city?: string | null;
    country?: string | null;
    mutualConnections?: number | null;
    connectionStatus?: "Pending" | "Accepted" | "Rejected" | "Canceled" | null;
    time?: Date | null;
  }
  export interface FollowInterface {
    companyId: string | null;
    companyName: string | null;
    companyLogo: string | null;
    userId: string | null;
    profilePicture: string | null;
    firstname: string | null;
    lastname: string | null;
    headline: string;
    time: Date;
  }
  export interface BlockedUserInterface {
    userId: string;
    profilePicture: string;
    firstname: string;
    lastname: string;
    connectionStatus: "Blocked" | "Unblocked";
    mutualConnections: number;
  }

  export interface ConnectionRequestInterface {
    requestId: string;
    targetId: string;
    userId: string;
    requestedAt: Date;
    status: "pending" | "accepted" | "rejected";
  }

  export interface SearchProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface SortProps {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface testconnectsInterface {
    userID: string;
    firstName: string;
    lastName: string;
    mutualconnections:number;
  }