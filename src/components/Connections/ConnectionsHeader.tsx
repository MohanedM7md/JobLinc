import { SearchProps, SortProps } from "../../interfaces/networkInterfaces";
import SearchConnections from "./SearchConnections";


type ConnectionsHeaderProps = SearchProps & SortProps;

function ConnectionsHeader(props: ConnectionsHeaderProps) {
  const { searchTerm, setSearchTerm, setSortBy } = props;

  return (
    <div className="flex flex-col p-4 w-full border-b border-gray-300 ">
      <p>Connections</p>
      <div className="flex flex-row justify-between items-center overflow-hidden">
        <div className="flex flex-row items-center ">
          <span className="text-gray-500 text-sm lg:text-base">Sort by:</span>
          <select
            className="ml-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recentlyadded">Recently added</option>
            <option value="firstname">First Name</option> 
            <option value="lastname">Last Name</option>
          </select>
        </div>
          <SearchConnections searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* <span className="text-gray-500 text-sm cursor-pointer mx-3">
            Search with filters
          </span> */}
      </div>
    </div>
  );
}

export default ConnectionsHeader;