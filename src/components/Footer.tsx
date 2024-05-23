import "../footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faTwitterSquare,
  faInstagramSquare,
  faPinterestSquare,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const handleSubmit = () => {
    alert("Thank you for signing up for our newsletter");
  };

  return (
    <div
      className="footer"
      style={{
        backgroundColor: "#F0E68C",
        marginTop: "10%",
        marginBottom: "0",
      }}
    >
      <div>
        <p>
          Stay up to date with the latest offers and promotions by signing up to
          our newsletter
        </p>
        <input
          className="form-input"
          type="email"
          placeholder="Enter Email"
          name="email"
        />

        <button
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="socials">
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
      </div>
    </div>
  );
};

export default Footer;
