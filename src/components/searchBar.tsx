import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const searchBar = () => {
  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button type="button" onClick={() => {}}>
          <p>Search</p>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default searchBar;
