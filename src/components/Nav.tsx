import "../nav.css";
import Menu from "./menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="nav">
      <head>
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
        <meta
          name="google-signin-client_id"
          content="383391503149-i3jmo56tbfiss1t923g1icnghdgses1g.apps.googleusercontent.com.apps.googleusercontent.com"
        ></meta>
      </head>
      <div className="top-bar">
        <Menu />
        <h3>Nuriaa</h3>

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
