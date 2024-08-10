import { useEffect, useState } from "react";

import "../styles.css";
import "../cart.css";
import { db } from "../firebase";
import {
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
import { useUser } from "../context/UserContext";

const Cart = () => {
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pickUp, setPickUp] = useState<string>("");
  const { userDetails, saveDetails, user, cart, fetchCartData, totalPrice } =
    useUser();

  const clearCart = async () => {
    if (!user) {
      return;
    }
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
      alert("Error clearing Cart");
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchCartData();

    setLoading(false);
  }, [user]);

  return (
    <>
      {loading && <div className="loader"></div>}
      {cart ? (
        <>
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
                <div className="detailData">
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
                        placeholder="pickUp Location"
                        onChange={(e) => setPickUp(e.target.value)}
                      />
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => saveDetails(userName, phone, pickUp)}
                >
                  Save Details
                </button>
                <p>Total Price : {totalPrice}</p>
                {userDetails && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
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
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
};

export default Cart;
