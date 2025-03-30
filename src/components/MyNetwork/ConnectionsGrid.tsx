import ConnectCard from "./ConnectCard";
import { useEffect, useState } from "react";
import { getNetworkFeed } from "../../services/api/networkServices";
import { connectsInterface } from "interfaces/networkInterfaces";

function ConnectionsGrid() {
    const people = [
        {
            lincbuttonid: "LincButton1",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Tyrone",
            userBio: "Junior plumbing student @ Waterloo University",
            mutuals: "Abdelrahman Fathy and 3 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton2",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Jane",
            userBio: "Senior graphic designer @ Creative Arts",
            mutuals: "Ahmed El-Sayed and 5 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton3",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "John",
            userBio: "Software engineer @ Tech Solutions",
            mutuals: "Sara Ibrahim and 2 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton1",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Tyrone",
            userBio: "Junior plumbing student @ Waterloo University",
            mutuals: "Abdelrahman Fathy and 3 others are mutual connections"
        },
        {
            lincbuttonid: "LincButton1",
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Tyrone",
            userBio: "Junior plumbing student @ Waterloo University",
            mutuals: "Abdelrahman Fathy and 3 others are mutual connections"
        },  
        
    ];

    const [connects, setConnects] = useState<connectsInterface[]>([]);

    useEffect(() => {
      const controller = new AbortController();
      const fetchData = async () => {
        try {
          const response = await getNetworkFeed(5, controller.signal);
          console.log(response);
          setConnects(Array.isArray(response) ? response : []);
        } catch (error) {
          console.error('Error fetching network feed:', error);
        }
      };
      fetchData();
    
      return () => {
        controller.abort();
      };
    }, []);
    
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-md border-2 border-gray-200 p-4">
        {Array.isArray(connects) &&
          connects.map((connect, index) => (
            <ConnectCard
              key={index}
              lincbuttonid={connect.lincbuttonid}
              profilePicture={connect.profilePicture}
              userName={connect.userName}
              userBio={connect.userBio}
              Mutuals={connect.mutuals}
            />
          ))}
      </div>
    );
}
export default ConnectionsGrid