import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimesCircle,
  faArrowLeft,
  faUser,
  faSignIn,
  faMessage,
  faShop,
  faQuestion,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareFacebook,
  faTwitterSquare,
  faInstagramSquare,
  faPinterestSquare,
} from "@fortawesome/free-brands-svg-icons";
import "../menu.css";
import ShopMenu from "./ShopMenu";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenuVisible = () => {
    console.log("menu toggles");
    setMenuVisible(!menuVisible);
  };

  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const [filterVisible, setFilterVisible] = useState(false);
  const toggleFilterVisible = () => {
    setFilterVisible(!filterVisible);
    setMenuVisible(!menuVisible);
  };

  const navigate = useNavigate();

  const shopVisible = () => {
    setFilterVisible(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          toggleMenuVisible();
        }}
        className="menuButton"
      >
        <p>Menu</p>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {menuVisible && (
        <>
          <button
            type="button"
            className="closeMenu"
            onClick={() => {
              setMenuVisible(false);
            }}
          >
            <p>Close Menu</p>
            <FontAwesomeIcon icon={faTimesCircle} className="icon" />
          </button>
          <ul className={`menu ${menuVisible ? "visible" : ""}`} ref={menuRef}>
            <li
              onClick={() => {
                toggleFilterVisible();
              }}
            >
              Shop <FontAwesomeIcon icon={faShop} />
            </li>
            <li
              onClick={() => {
                navigate("/about");
              }}
            >
              About
              <FontAwesomeIcon icon={faQuestion} />
            </li>
            <li
              onClick={() => {
                navigate("/add-item");
              }}
            >
              Sell <FontAwesomeIcon icon={faSearchDollar} />
            </li>
            <li
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact Us <FontAwesomeIcon icon={faMessage} />
            </li>
            <li
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile <FontAwesomeIcon icon={faUser} />
            </li>
            <li
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
              <FontAwesomeIcon icon={faSignIn} />
            </li>
            <li>
              <a href="facebook.com">
                <FontAwesomeIcon icon={faSquareFacebook} className="icon" />
              </a>
              <a href="twitter.com">
                <FontAwesomeIcon icon={faTwitterSquare} className="icon" />
              </a>
              <a href="instagram.com">
                <FontAwesomeIcon icon={faInstagramSquare} className="icon" />
              </a>
              <a href="pinterest.com">
                <FontAwesomeIcon icon={faPinterestSquare} className="icon" />
              </a>
            </li>
          </ul>
        </>
      )}
      {filterVisible && (
        <>
          <button
            type="button"
            className="closeMenu"
            onClick={() => {
              setMenuVisible(false);
              setFilterVisible(false);
            }}
          >
            <p>Close Menu</p>
            <FontAwesomeIcon icon={faTimesCircle} className="icon" />
          </button>
          <button
            type="button"
            className="back-menu"
            onClick={() => {
              toggleFilterVisible();
            }}
          >
            <p>Back</p>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <ShopMenu setMenuVisible={shopVisible} />
        </>
      )}
    </>
  );
};

export default Menu;
