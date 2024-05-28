import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "../google-button.css";

const GoogleSignInButton = () => {
  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      // Handle successful sign-in here
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle errors here
    }
  };

  return (
    <button type="button" className="google-button" onClick={handleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
