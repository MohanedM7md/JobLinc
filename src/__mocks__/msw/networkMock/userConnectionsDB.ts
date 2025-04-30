import { ConnectionInterface } from "../../../interfaces/networkInterfaces";

export const userconnectionresponse: ConnectionInterface[] = [
        {
          userId: "1",
          profilePicture: "src/assets/Tyrone.jpg",
          firstName: "John",
          lastName: "Doe",
          headline: "Software Engineer",
          city: "New York",
          country: "USA",
          mutualConnections: 5,
          connectionStatus: "accepted",
          connectedDate: null,
        },
        {
          userId: "2",
          profilePicture: "src/assets/Tyrone.jpg",
          firstName: "Jane",
          lastName: "Smith",
          headline: "Product Manager",
          city: "London",
          country: "UK",
          mutualConnections: 3,
          connectionStatus: "pending",
          connectedDate: null,
        },
        {
          userId: "3",
          profilePicture: "src/assets/Tyrone.jpg",
          firstName: "Emily",
          lastName: "Brown",
          headline: "Graphic Designer",
          city: "Cairo",
          country: "Egypt",
          mutualConnections: 8,
          connectionStatus: "accepted",
          connectedDate: null,
        }
];
