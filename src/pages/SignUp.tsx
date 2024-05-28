import "../otherforms.css";
import Nav from "../components/Nav";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import black from "../assets/images/black.avif";
import Footer from "../components/Footer";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleSignInButton from "../components/GoogleSignIn";
import "../google-button.css";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User is signed in, handle success (optional)
      console.log("User signed in:", userCredential.user);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.error("Sign in error:", errorMessage);
      }
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign in error:", errorCode, errorMessage);
      }
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Send email verification
      await sendEmailVerification(userCredential.user);
      localStorage.setItem("user_email", JSON.stringify(email));
      handleLogin(email, password);
    } catch (error) {
      // Handle errors appropriately
      console.error("Signup error:", error);
      // You can display an error message to the user here
    }
  };

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
      navigate("/");
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
      <Nav />
      <div className="homeDiv">
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
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
