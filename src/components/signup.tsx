import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

const Login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // User is signed in, handle success (optional)
    console.log("User signed in:", userCredential.user);
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

const SignUpVerification = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Send email verification
    await sendEmailVerification(userCredential.user);
    localStorage.setItem("user_email", JSON.stringify(email));
  } catch (error) {
    // Handle errors appropriately
    console.error("Signup error:", error);
    // You can display an error message to the user here
  }
};
const SignUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Send email verification

    localStorage.setItem("user_email", JSON.stringify(email));
  } catch (error) {
    // Handle errors appropriately
    console.error("Signup error:", error);
    // You can display an error message to the user here
  }
};
const SignUpLogin = async (email: string, password: string) => {
  SignUp(email, password);
  Login(email, password);
};

const VerifiedSignIn = async (email: string, password: string) => {
  SignUpVerification(email, password);
  Login(email, password);
};

export { Login, SignUpVerification, SignUp, SignUpLogin, VerifiedSignIn };
