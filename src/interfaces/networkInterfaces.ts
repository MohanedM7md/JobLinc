export interface connectsInterface {
    userId: string;
    profilePicture: string,
    firstName: string,
    lastName: string,
    userBio: string,
    Mutuals: Number;
  }
export interface invitationInterface {
    userId: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    userBio: string;
    Mutuals: Number;
    acknowledged?: boolean;
  }
  export interface ConnectionInterface {
    userId: string;
    profileImage: string;
    firstName: string;
    lastName: string;
    userBio: string;
    connectedDate: Date;
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