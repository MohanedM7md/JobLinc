import MutualConnectionListCard from "../components/Connections/MutualConnectionListCard";
import ConnectionsListCard from "../components/Connections/ConnectionsListCard";
function MyConnections() {
  return (
    <>
      <div className="bg-lightGray h-screen w-full flex flex-col">
        <ConnectionsListCard/>
        {/* <MutualConnectionListCard></MutualConnectionListCard> */}
      </div>
    </>
  );
}
export default MyConnections;