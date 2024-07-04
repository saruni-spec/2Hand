import "../nav.css";
import Menu from "./menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="top-bar">
        <Menu />
        <h3 onClick={() => navigate("/")}>Nuriaa</h3>

        <a href="/login" id="a">
          Sign In
        </a>
      </div>
      <ul className="nav-bar">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/shop">Shop</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/add-item">Sell</a>
        </li>
        <li>
          <a href="/cart">
            Cart <FontAwesomeIcon icon={faCartShopping} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
