// Import Firebase auth functions
// Import the Firebase auth instance from the config file
// Import FirebaseError for error handling
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

/**
 * Function to log in a user with email and password
 * @param email - user's email address
 * @param password - user's password
 */
const Login = async (email: string, password: string) => {
  try {
    // Attempt to sign in the user
    await signInWithEmailAndPassword(auth, email, password);
    // If successful, you can handle post-login actions here (e.g., navigation or state update)
  } catch (error) {
    // Check if the error is a general JavaScript error
    if (error instanceof Error) {
      const errorMessage = error.message;
      console.error("Sign in error:", errorMessage);
    }

    // Check if the error is a Firebase-specific error
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign in error:", errorCode, errorMessage);
    }
  }
};

/**
 * Function to sign up a user with email and password, then send email verification
 * @param email - user's email address
 * @param password - user's password
 */
const SignUpVerification = async (email: string, password: string) => {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send verification email to the newly created user
    await sendEmailVerification(userCredential.user);

    // Store the user's email in localStorage for future reference
    localStorage.setItem("user_email", JSON.stringify(email));
  } catch (error) {
    // Catch and log any errors that occur during sign-up or email verification
    console.error("Signup error:", error);
    // Optionally, you can show a user-friendly message or handle the error further
  }
};

/**
 * Function to sign up a user without sending email verification
 * @param email - user's email address
 * @param password - user's password
 */
const SignUp = async (email: string, password: string) => {
  try {
    // Create a new user with email and password
    await createUserWithEmailAndPassword(auth, email, password);

    // Store the user's email in localStorage for future reference
    localStorage.setItem("user_email", JSON.stringify(email));
  } catch (error) {
    // Catch and log any errors during sign-up
    console.error("Signup error:", error);
    // Optionally, you can show a user-friendly message or handle the error further
  }
};

/**
 * Function to both sign up and log in a user
 * @param email - user's email address
 * @param password - user's password
 */
const SignUpLogin = async (email: string, password: string) => {
  // First, sign up the user
  await SignUp(email, password);
  // Then, log in the user
  await Login(email, password);
};

/**
 * Function to sign up a user, send email verification, then log in
 * @param email - user's email address
 * @param password - user's password
 */
const VerifiedSignIn = async (email: string, password: string) => {
  // First, sign up the user and send a verification email
  await SignUpVerification(email, password);
  // Then, log in the user
  await Login(email, password);
};

export { Login, SignUpVerification, SignUp, SignUpLogin, VerifiedSignIn };
