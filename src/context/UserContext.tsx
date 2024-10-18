import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { FirebaseError } from "firebase/app";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";

// Interfaces for different data structures used in the app
interface CartDetails {
  image: string;
  price: number;
  quantity: number;
  label: string;
  category: string;
  size: string;
  user: string;
}

interface userDetails {
  name: string;
  email: string;
  phone: string;
  pickUp: string;
}

interface User {
  email: string | null;
  uid: string;
}

type UniformType = {
  category: string;
  type: string;
  color: string;
  image: string;
  image1: string;
  image2: string;
  price: number;
  quantity: number;
  label: string;
  size: string;
  description: string;
  seller: string;
};

// This interface defines all the functions and state values that the UserContext provides
interface UserContextType {
  userDetails: userDetails | null;
  signOut: () => void;
  cart: CartDetails[] | null;
  fetchCartData: () => Promise<void>;
  user: User | null;
  totalPrice: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string) => Promise<void>;
  saveDetails: (name: string, phone: string, pickUp: string) => Promise<void>;
  addToCart: (uniform: UniformType) => Promise<void>;
  setUser: (user: User) => void;
}

// Create a context to store user data and actions
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component that holds all the state and logic for user actions and state
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // State to hold user details, logged in user, cart items, and total price
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartDetails[]>([]);
  const [totalPrice, setTotalPrice] = useState<string | null>(null);

  const navigate = useNavigate();

  // Function to fetch user details from the database using the user's email
  const loadUserDetails = async (email: string | null) => {
    const userQuery = query(
      collection(db, "Users"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) {
      setUserDetails(null);
    } else {
      // Set the first user's details in state
      const userDetails = querySnapshot.docs.map((doc) => doc.data());
      setUserDetails(
        userDetails[0] as {
          name: string;
          email: string;
          phone: string;
          pickUp: string;
        }
      );
    }
  };

  // Function to log in a user with email and password
  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On success, store user data locally and update the user state
      localStorage.setItem("user", "1");
      const user = auth.currentUser;
      if (user) {
        setUser({ email: user.email, uid: user.uid });
      }

      loadUserDetails(email); // Load user's additional details
      navigate("/"); // Navigate to home after login
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

  // Function to sign up a new user, send email verification, and log them in
  const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Send email verification to the new user
      await sendEmailVerification(userCredential.user);
      localStorage.setItem("user_email", JSON.stringify(email));
      handleLogin(email, password); // Log in user after signing up
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // Function to save user contact details (name, phone, pickUp point) to the database
  const saveDetails = async (name: string, phone: string, pickUp: string) => {
    if (!user?.email) {
      return;
    }
    try {
      const email = user.email;
      const userDetails = {
        name,
        email,
        phone,
        pickUp,
      };
      await addDoc(collection(db, "Users"), userDetails); // Save details to Firestore
      setUserDetails(userDetails); // Update local state with user details
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  // Function to fetch the user's cart data from Firestore and calculate total price
  const fetchCartData = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    const newCart: CartDetails[] = [];

    const cartQuery = query(
      collection(db, "Cart"),
      where("user", "==", user.email)
    );

    const querySnapshot = await getDocs(cartQuery);

    querySnapshot.forEach((doc) => {
      const entry = doc.data() as CartDetails;
      newCart.push(entry);
    });

    setCart(newCart); // Update cart state

    // Calculate total price of the cart items
    setTotalPrice(
      newCart.reduce((total, item) => total + Number(item.price), 0).toString()
    );
  };

  // Function to add a uniform item to the cart
  const addToCart = async (uniform: UniformType) => {
    if (!user) {
      navigate("/login"); // Navigate to login if the user is not logged in
      return;
    }

    if (user && user.uid === uniform.seller) {
      alert("You can't buy your own item");
      return;
    }

    try {
      // Add the selected uniform to the Firestore 'Cart' collection
      await addDoc(collection(db, "Cart"), {
        ...uniform,
        user: user.email,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Function to sign the user out and reset the user details
  const signOut = () => {
    setUserDetails(null);
    localStorage.removeItem("user");
  };

  // Effect to handle the Firebase authentication state and update the user accordingly
  useEffect(() => {
    const timeout = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user); // Set user state if authenticated
        } else {
          setUser(null); // Reset user state if not authenticated
        }
      });

      return () => unsubscribe();
    }, 1500);

    return () => clearInterval(timeout); // Cleanup timeout on component unmount
  }, []);

  // Provide the context to all children components
  return (
    <UserContext.Provider
      value={{
        userDetails,
        signOut,
        handleLogin,
        handleSignUp,
        saveDetails,
        user,
        cart,
        fetchCartData,
        addToCart,
        totalPrice,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in other components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
