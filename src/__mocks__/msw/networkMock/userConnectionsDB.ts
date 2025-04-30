import { ConnectionInterface } from "../../../interfaces/networkInterfaces";

export const userconnectionresponse: ConnectionInterface[] = [
        {
          userId: "1",
          profilePicture: "src/assets/Tyrone.jpg",
          firstname: "John",
          lastname: "Doe",
          headline: "Software Engineer",
          city: "New York",
          country: "USA",
          mutualConnections: 5,
          connectionStatus: "Accepted",
          time: null,
        },
        {
          userId: "2",
          profilePicture: "src/assets/Tyrone.jpg",
          firstname: "Jane",
          lastname: "Smith",
          headline: "Product Manager",
          city: "London",
          country: "UK",
          mutualConnections: 3,
          connectionStatus: "Pending",
          time: null,
        },
        {
          userId: "3",
          profilePicture: "src/assets/Tyrone.jpg",
          firstname: "Emily",
          lastname: "Brown",
          headline: "Graphic Designer",
          city: "Cairo",
          country: "Egypt",
          mutualConnections: 8,
          connectionStatus: "Accepted",
          time: null,
        }
];
