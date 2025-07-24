import { BlockedUserInterface } from "@interfaces/networkInterfaces";

export const blockedUsersResponse: BlockedUserInterface[] = [
    {
      userId: "user123",
      profilePicture: "src/assets/Tyrone.jpg",
      firstname: "Tyrone",
      lastname: "Smith",
      connectionStatus: "Blocked",
      mutualConnections: 5,
    },
    {
      userId: "user456",
      profilePicture: "src/assets/Tyrone.jpg",
      firstname: "Jasmine",
      lastname: "Brown",
      connectionStatus: "Blocked",
      mutualConnections: 10,
    },
    {
      userId: "user789",
      profilePicture: "src/assets/Tyrone.jpg",
      firstname: "Michael",
      lastname: "Johnson",
      connectionStatus: "Blocked",
      mutualConnections: 2,
    },
    {
      userId: "user321",
      profilePicture: "src/assets/Tyrone.jpg",
      firstname: "Sophia",
      lastname: "Davis",
      connectionStatus: "Blocked",
      mutualConnections: 8,
    },
    {
      userId: "user654",
      profilePicture: "src/assets/Tyrone.jpg",
      firstname: "David",
      lastname: "Wilson",
      connectionStatus: "Blocked",
      mutualConnections: 3,
    },
  ];