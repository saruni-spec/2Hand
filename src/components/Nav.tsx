import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="top-bar">
        <Menu />
        <p onClick={() => navigate("/")}>Nuriaa</p>
        <Link to="/login" id="a">
          Sign In
        </Link>
      </div>
      <ul className="nav-bar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/add-item">Sell</Link>
        </li>
        <li>
          <Link to="/cart">
            Cart <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
