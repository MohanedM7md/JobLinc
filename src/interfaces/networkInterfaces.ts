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
    firstName: string;
    lastName: string;
    headline: string;
    Mutuals: Number;
    acknowledged?: boolean;
  }
  export interface ConnectionInterface {
    userId: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    headline: string;
    city?: string | null;
    country?: string | null;
    mutualConnections?: number | null;
    connectionStatus?: "pending" | "accepted" | "rejected" | null;
    connectedDate?: Date | null;
  }
  export interface BlockedUserInterface {
    userId: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    connectionStatus: "blocked" | "unblocked";
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