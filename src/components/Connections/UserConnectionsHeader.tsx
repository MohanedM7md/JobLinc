import { SearchProps } from "../../interfaces/networkInterfaces";
import SearchConnections from "./SearchConnections";


type ConnectionsHeaderProps = SearchProps;

function UserConnectionsHeader(props: ConnectionsHeaderProps) {
  const { searchTerm, setSearchTerm} = props;

  return (
    <div className="flex flex-col p-4 w-full border-b border-gray-300 ">
      <div className="flex flex-row justify-between items-center overflow-hidden">
          <p>Connections</p>
          <SearchConnections searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* <span className="text-gray-500 text-sm cursor-pointer mx-3">
            Search with filters
          </span> */}
      </div>
    </div>
  );
}

export default UserConnectionsHeader;