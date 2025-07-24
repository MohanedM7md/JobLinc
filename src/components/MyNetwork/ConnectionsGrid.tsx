import ConnectCard from "./ConnectCard";
import { useEffect, useState } from "react";
import { getNetworkFeed } from "../../services/api/networkServices";
import { connectsInterface } from "interfaces/networkInterfaces";

function ConnectionsGrid() {
  const [connects, setConnects] = useState<connectsInterface[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getNetworkFeed(5, controller.signal);
        console.log(response);
        setConnects(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching network feed:", error);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      role="grid"
      className="grid sm:grid-cols-2 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 bg-white rounded-md border-2 border-gray-200 p-4"
    >
      {Array.isArray(connects) &&
        connects.map((connect, index) => (
          <ConnectCard
            key={index}
            userId={connect.userId}
            profilePicture={connect.profilePicture}
            firstName={connect.firstName}
            lastName={connect.lastName}
            headline={connect.headline}
            Mutuals={connect.Mutuals}
          />
        ))}
    </div>
  );
}

export default ConnectionsGrid;
