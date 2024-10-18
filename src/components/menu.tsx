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
import "../menu.css"; // Import CSS for styling
import ShopMenu from "./ShopMenu"; // Import ShopMenu component
import { useNavigate } from "react-router-dom"; // Import navigation hook

const Menu = () => {
  // State to manage the visibility of the menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle function to open/close the menu
  const toggleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };

  // Ref to track the menu container for detecting outside clicks
  const menuRef = useRef<HTMLUListElement | null>(null);

  // Function to close the menu if the user clicks outside of it
  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  // Add an event listener for outside clicks when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // State to manage the visibility of the filter (Shop Menu)
  const [filterVisible, setFilterVisible] = useState(false);

  // Toggle function to show/hide the Shop menu and close the main menu
  const toggleFilterVisible = () => {
    setFilterVisible(!filterVisible);
    setMenuVisible(!menuVisible);
  };

  // Navigation hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to hide the Shop menu when it's no longer needed
  const shopVisible = () => {
    setFilterVisible(false);
  };

  return (
    <>
      {/* Main menu button */}
      <button type="button" onClick={toggleMenuVisible} className="menuButton">
        <p>Menu</p>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* If the menu is visible, show the menu content */}
      {menuVisible && (
        <>
          {/* Button to close the menu */}
          <button
            type="button"
            className="closeMenu"
            onClick={() => setMenuVisible(false)}
          >
            <p>Close Menu</p>
            <FontAwesomeIcon icon={faTimesCircle} className="icon" />
          </button>

          {/* The menu itself */}
          <ul className={`menu ${menuVisible ? "visible" : ""}`} ref={menuRef}>
            {/* List item to toggle Shop Menu */}
            <li onClick={toggleFilterVisible}>
              Shop <FontAwesomeIcon icon={faShop} />
            </li>
            {/* Other navigation items */}
            <li onClick={() => navigate("/about")}>
              About <FontAwesomeIcon icon={faQuestion} />
            </li>
            <li onClick={() => navigate("/add-item")}>
              Sell <FontAwesomeIcon icon={faSearchDollar} />
            </li>
            <li onClick={() => navigate("/contact")}>
              Contact Us <FontAwesomeIcon icon={faMessage} />
            </li>
            <li onClick={() => navigate("/profile")}>
              Profile <FontAwesomeIcon icon={faUser} />
            </li>
            <li onClick={() => navigate("/login")}>
              Sign In <FontAwesomeIcon icon={faSignIn} />
            </li>
            {/* Social media links */}
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

      {/* If the filter (Shop Menu) is visible, render it */}
      {filterVisible && (
        <>
          {/* Button to close the Shop Menu and the entire menu */}
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

          {/* Button to go back from Shop Menu to the main menu */}
          <button
            type="button"
            className="back-menu"
            onClick={toggleFilterVisible}
          >
            <p>Back</p>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          {/* Render ShopMenu component and pass `shopVisible` as a prop */}
          <ShopMenu setMenuVisible={shopVisible} />
        </>
      )}
    </>
  );
};

export default Menu;
