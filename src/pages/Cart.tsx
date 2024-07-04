import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../styles.css";
import "../cart.css";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import IntaSendButton from "../components/Intasend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartDetails[]>([]);
  const [totalPrice, setTotalPrice] = useState<string | null>(null);
  const [user, setUser] = useState<string>("");
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pickUp, setPickUp] = useState<string>("");

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

  const fetchCartData = async () => {
    const user = auth.currentUser;
    const newCart: {
      image: string;
      price: number;
      quantity: number;
      label: string;
      category: string;
      size: string;
      user: string;
    }[] = [];

    if (user) {
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
    } else {
      setCart([]);
    }

    setCart(newCart);

    setTotalPrice(
      cart.reduce((total, item) => total + Number(item.price), 0).toString()
    );
  };

  const clearCart = async (user: userDetails) => {
    try {
      // Query all cart items for the current user
      const cartQuery = query(
        collection(db, "Cart"),
        where("user", "==", user.email)
      );

      const querySnapshot = await getDocs(cartQuery);

      // Use a batch write to delete all documents
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch
      await batch.commit();

      fetchCartData();
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const removeItem = async (sample: {
    image: string;
    price: number;
    quantity: number;
    label: string;
    category: string;
    size: string;
    user: string;
  }) => {
    try {
      const cartQuery = query(
        collection(db, "Cart"),
        where("user", "==", sample.user),
        where("label", "==", sample.label),
        where("size", "==", sample.size)
      );

      const querySnapshot = await getDocs(cartQuery);

      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(db, "Cart", docToDelete.id));
        fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveDetails = async (
    user: string,
    name: string,
    phone: string,
    pickUp: string
  ) => {
    try {
      const userDetails = {
        name,
        email: user,
        phone,
        pickUp,
      };
      await addDoc(collection(db, "Users"), userDetails);
      setUserDetails(userDetails);
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          loadUserDetails(user.email);
          if (user.email) {
            setUser(user.email);
          }

          fetchCartData();
          console.log(user, "use cart 2");
        } else {
          setCart([]);
        }
      });

      setLoading(false);
      // Cleanup function to unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [cart]);

  return (
    <>
      <Nav />
      <div className="homeDiv">
        {loading && <div className="loader"></div>}
        {!loading && cart.length === 0 && <p>Cart is empty</p>}
        {!loading && cart.length > 0 && (
          <div className="duo">
            <ul className="cart">
              {cart.map((sample) => (
                <li>
                  <img src={sample.image} alt="" />
                  <p>
                    <b>{sample.price} ksh</b>,
                  </p>

                  <p>Label : {sample.label}</p>

                  <button
                    type="button"
                    onClick={() => {
                      removeItem(sample);
                    }}
                  >
                    Remove
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="form">
              <p>Total No of items : {cart.length}</p>

              <p>Date : {new Date().toLocaleDateString("en-GB")}</p>
              <h4>Shipping Details</h4>
              <div>
                {userDetails && (
                  <>
                    <p>Name : {userDetails.name}</p>
                    <p>Phone: {userDetails.phone}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Pick Up Point: {userDetails.pickUp}</p>
                  </>
                )}
                {!userDetails && (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="pickUp"
                      onChange={(e) => setPickUp(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => saveDetails(user, userName, phone, pickUp)}
                    >
                      Save Details
                    </button>
                  </>
                )}
              </div>

              <p>Total Price : {totalPrice}</p>
              {userDetails && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      clearCart(userDetails);
                    }}
                  >
                    Clear Cart
                  </button>
                  {totalPrice && (
                    <IntaSendButton
                      amount={totalPrice}
                      phone={userDetails.phone}
                      email={userDetails.email}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
