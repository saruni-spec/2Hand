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

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartDetails[]>([]);
  const [totalPrice, setTotalPrice] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadUserDetails = async (email: string | null) => {
    const userQuery = query(
      collection(db, "Users"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) {
      setUserDetails(null);
    } else {
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

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is signed in, handle success (optional)
      localStorage.setItem("user", "1");
      const user = auth.currentUser;
      if (user) {
        setUser({ email: user.email, uid: user.uid });
      }

      loadUserDetails(email);
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
      await addDoc(collection(db, "Users"), userDetails);
      setUserDetails(userDetails);
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const fetchCartData = async () => {
    console.log("fetching cart");
    if (!user) {
      console.log("no user not cart");
      setCart([]);
      return;
    }
    console.log("user cart");
    const newCart: {
      image: string;
      price: number;
      quantity: number;
      label: string;
      category: string;
      size: string;
      user: string;
    }[] = [];

    const cartQuery = query(
      collection(db, "Cart"),
      where("user", "==", user.email)
    );

    const querySnapshot = await getDocs(cartQuery);

    querySnapshot.forEach((doc) => {
      const entry = {
        image: doc.data().image,
        price: doc.data().price,
        quantity: doc.data().quantity,
        size: doc.data().size,
        category: doc.data().category,
        label: doc.data().label,
        user: doc.data().user,
      };
      newCart.push(entry);
    });

    setCart(newCart);

    setTotalPrice(
      cart.reduce((total, item) => total + Number(item.price), 0).toString()
    );
  };

  const addToCart = async (uniform: UniformType) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user && user.uid === uniform.seller) {
      alert("You can't buy your own item");
      return;
    }

    try {
      await addDoc(collection(db, "Cart"), {
        image: uniform.image,
        price: uniform.price,
        quantity: uniform.quantity,
        label: uniform.label,
        category: uniform.category,
        size: uniform.size,
        user: user.email,
        type: uniform.type,
        color: uniform.color,
        description: uniform.description,
        seller: uniform.seller,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signOut = () => {
    setUserDetails(null);

    localStorage.removeItem("user");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }, 1500);

    return () => clearInterval(timeout);
  }, []);

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

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
