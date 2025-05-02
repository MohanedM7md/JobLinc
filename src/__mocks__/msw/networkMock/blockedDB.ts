import { BlockedUserInterface } from "@interfaces/networkInterfaces";

export const blockedUsersResponse: BlockedUserInterface[] = [
    {
      userId: "user123",
      profilePicture: "src/assets/Tyrone.jpg",
      firstName: "Tyrone",
      lastName: "Smith",
      connectionStatus: "blocked",
      mutualConnections: 5,
    },
    {
      userId: "user456",
      profilePicture: "src/assets/Tyrone.jpg",
      firstName: "Jasmine",
      lastName: "Brown",
      connectionStatus: "blocked",
      mutualConnections: 10,
    },
    {
      userId: "user789",
      profilePicture: "src/assets/Tyrone.jpg",
      firstName: "Michael",
      lastName: "Johnson",
      connectionStatus: "blocked",
      mutualConnections: 2,
    },
    {
      userId: "user321",
      profilePicture: "src/assets/Tyrone.jpg",
      firstName: "Sophia",
      lastName: "Davis",
      connectionStatus: "blocked",
      mutualConnections: 8,
    },
    {
      userId: "user654",
      profilePicture: "src/assets/Tyrone.jpg",
      firstName: "David",
      lastName: "Wilson",
      connectionStatus: "blocked",
      mutualConnections: 3,
    },
  ];