import "../footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faTwitterSquare,
  faInstagramSquare,
  faPinterestSquare,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const handleSubmit = () => {
    alert("Thank you for signing up for our newsletter");
  };
  const navigate = useNavigate();

  return (
    <div className="footer" style={{}}>
      <div className="emailForm">
        <p>
          Stay up to date with the latest offers and promotions by signing up to
          our newsletter
        </p>
        <div>
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
      </div>
      <div className="footer-div">
        <p
          onClick={() => {
            navigate("/about");
          }}
        >
          About Us
        </p>
        <p
          onClick={() => {
            navigate("/contact");
          }}
        >
          Contact Us
        </p>
        <p
          onClick={() => {
            navigate("/donation");
          }}
        >
          Interested in Making Donations?
        </p>
      </div>

      <div className="footer-div">
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
    </div>
  );
};

export default Footer;
