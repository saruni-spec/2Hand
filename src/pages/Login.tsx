import "../otherforms.css";

import { useNavigate } from "react-router-dom";

import black from "../assets/images/black.avif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import GoogleSignInButton from "../components/GoogleSignIn";
import "../google-button.css";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailInput = e.currentTarget.elements.namedItem("email");
    const passwordInput = e.currentTarget.elements.namedItem("password");

    const email =
      emailInput instanceof HTMLInputElement ? emailInput.value : "";
    const password =
      passwordInput instanceof HTMLInputElement ? passwordInput.value : "";

    if (email && password) {
      handleLogin(email, password);
    }
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <div className="formDiv">
        <form className="login" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Enter Email"
            name="email"
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
          <button type="submit" className="google-button">
            Login <FontAwesomeIcon icon={faRightToBracket} />
          </button>
          <button
            type="button"
            onClick={() => handleSignUp()}
            className="google-button"
          >
            Sign up <FontAwesomeIcon icon={faUserPlus} />
          </button>

          <GoogleSignInButton />
        </form>

        <div
          style={{
            backgroundImage: `url(${black})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </>
  );
};

export default Login;
