import "../otherforms.css";
import Nav from "../components/Nav";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import black from "../assets/images/black.avif";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import GoogleSignInButton from "../components/GoogleSignIn";
import "../google-button.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: "/" };

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User is signed in, handle success (optional)
      console.log("User signed in:", userCredential.user);

      navigate(`/${from}`);
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
      <Nav />
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
      <Footer />
    </>
  );
};

export default Login;
