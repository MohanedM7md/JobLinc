export interface connectsInterface {
    lincbuttonid: string,
    profilePicture: string,
    userName: string,
    userBio: string,
    mutuals: string,
  }
export interface invitationInterface {
    profilePicture: string; 
    userName: string;
    userBio: string;
    Mutuals: string;
    ignoreButtonid: string;
    acceptButtonid: string;
    acknowledged?: boolean;
  }
  export interface ConnectionInterface {
    id: string;
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