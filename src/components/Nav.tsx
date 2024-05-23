import "../nav.css";
import Menu from "./menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="nav">
      <div className="top-bar">
        <Menu />
        <h3>Nuriaa</h3>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button type="button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <a href="/login">Sign In</a>
      </div>
      <ul className="nav-bar">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/shop/${}">Shop</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="/add-item">Sell</a>
        </li>
        <li>
          <a href="/cart">Cart</a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
