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
  export interface ConnectionCardProps {
    profileImage: string;
    firstName: string;
    lastName: string;
    userBio: string;
    connectedDate: string;
  }

  export interface SearchProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  }
  
  export interface SortProps {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
  }