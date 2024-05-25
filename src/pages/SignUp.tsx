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
          />
          <input
            className="form-input"
            type="password"
            placeholder="Enter Password"
            name="password"
          />
          <input
            className="form-input"
            type="password"
            placeholder="Confirm Password"
          />

          <button type="submit">
            {" "}
            <p>
              Sign up <FontAwesomeIcon icon={faUserPlus} />
            </p>
          </button>
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

export default SignUp;
