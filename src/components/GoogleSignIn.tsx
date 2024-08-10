import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "../google-button.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const GoogleSignInButton = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("user", "1");
      // Handle successful sign-in here
      const user = auth.currentUser;
      if (user) {
        setUser(user);
      }

      navigate("/");
    } catch (error) {
      alert("Error signing in");
      navigate("/sign-up");
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
