import BlockList from "../components/Connections/BlockList";
import BlockedUserCard from "../components/Connections/BlockedUserCard";
import ConnectionsListCard from "../components/Connections/ConnectionsListCard";
function Connections() {
  return (
    <>
      <div className="bg-lightGray h-screen w-full flex flex-col">
        <BlockList></BlockList>
        {/* <ConnectionsListCard /> */}
      </div>
    </>
  );
}
export default Connections;