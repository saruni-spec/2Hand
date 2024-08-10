import "../otherforms.css";

import black from "../assets/images/black.avif";

import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleSignInButton from "../components/GoogleSignIn";
import "../google-button.css";
import { useState } from "react";
import { useUser } from "../context/UserContext";

const SignUp = () => {
  const { handleSignUp } = useUser();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailInput = e.currentTarget.elements.namedItem("email");
    const passwordInput = e.currentTarget.elements.namedItem("password");

    const email =
      emailInput instanceof HTMLInputElement ? emailInput.value : "";
    const password =
      passwordInput instanceof HTMLInputElement ? passwordInput.value : "";

    if (email && password) {
      handleSignUp(email, password);
    }
  };

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const passwordMatch = () => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="confirm-input"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordMatch() ? (
            null && confirmPassword !== ""
          ) : (
            <p className="password">Passwords do not match</p>
          )}

          <button type="submit" className="google-button">
            Sign-up <FontAwesomeIcon icon={faUserPlus} />
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

export default SignUp;
