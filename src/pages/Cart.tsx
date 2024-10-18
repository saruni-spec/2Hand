import { useEffect, useState } from "react"; // Import necessary hooks from React

// Import CSS styles
import "../styles.css";
import "../cart.css";

// Import Firebase Firestore functions
import { db } from "../firebase";
import {
  collection, // Used to reference Firestore collections
  deleteDoc, // Used to delete documents from Firestore
  doc, // Used to reference a specific document in Firestore
  getDocs, // Retrieves documents from Firestore collections based on a query
  query, // Creates a query to fetch filtered data from Firestore
  where, // Used to specify conditions in Firestore queries
  writeBatch, // Performs batch writes for efficiency
} from "firebase/firestore";

// Import custom component and icon libraries
import IntaSendButton from "../components/Intasend"; // Payment integration component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Icon component
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Trash icon for remove button

// Import custom context hook for user and cart data
import { useUser } from "../context/UserContext";

// Main Cart component
const Cart = () => {
  const [loading, setLoading] = useState(true); // Loading state

  // State to hold user input for shipping details
  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pickUp, setPickUp] = useState<string>("");

  // Destructure values from custom user context
  const { userDetails, saveDetails, user, cart, fetchCartData, totalPrice } =
    useUser();

  // Function to clear the user's cart by deleting all cart items from Firestore
  const clearCart = async () => {
    if (!user) {
      return; // Exit if no user is logged in
    }
    try {
      // Create a query to get all cart items for the current user
      const cartQuery = query(
        collection(db, "Cart"),
        where("user", "==", user.email)
      );

      // Execute the query and retrieve matching documents
      const querySnapshot = await getDocs(cartQuery);

      // Use Firestore batch to delete all documents in the query result
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch write (delete)
      await batch.commit();

      // Refresh cart data after deletion
      fetchCartData();
    } catch (error) {
      console.error("Error clearing cart:", error); // Handle and log errors
    }
  };

  // Function to remove a specific item from the cart
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
      // Create a query to find the specific cart item to remove
      const cartQuery = query(
        collection(db, "Cart"),
        where("user", "==", sample.user),
        where("label", "==", sample.label),
        where("size", "==", sample.size)
      );

      // Execute the query
      const querySnapshot = await getDocs(cartQuery);

      // If the item exists, delete the first matched document
      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(db, "Cart", docToDelete.id)); // Delete the document
        fetchCartData(); // Refresh cart data after deletion
      }
    } catch (error) {
      alert("Error clearing Cart"); // Handle errors and show alert
    }
  };

  // useEffect to fetch cart data when the component mounts or when the user changes
  useEffect(() => {
    setLoading(true); // Show loading indicator while fetching data
    fetchCartData(); // Fetch the cart data
    setLoading(false); // Hide loading indicator once data is fetched
  }, [user]);

  return (
    <>
      {loading && <div className="loader"></div>}{" "}
      {/* Show loader while loading */}
      {cart ? (
        <>
          {/* Show message if the cart is empty */}
          {!loading && cart.length === 0 && <p>Cart is empty</p>}

          {/* Render cart items if there are items */}
          {!loading && cart.length > 0 && (
            <div className="duo">
              <ul className="cart">
                {cart.map((sample) => (
                  <li>
                    <img src={sample.image} alt="" /> {/* Display item image */}
                    <p>
                      <b>{sample.price} ksh</b>, {/* Display item price */}
                    </p>
                    {/* Button to remove the item from the cart */}
                    <button
                      type="button"
                      onClick={() => {
                        removeItem(sample);
                      }}
                    >
                      Remove
                      <FontAwesomeIcon icon={faTrash} /> {/* Trash icon */}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Form to display or save shipping details */}
              <div className="form">
                <p>Total No of items : {cart.length}</p>{" "}
                {/* Show total items */}
                <p>Date : {new Date().toLocaleDateString("en-GB")}</p>{" "}
                {/* Current date */}
                <h4>Shipping Details</h4>
                <div className="detailData">
                  {/* If userDetails exist, show saved shipping info */}
                  {userDetails && (
                    <>
                      <p>Name : {userDetails.name}</p>
                      <p>Phone: {userDetails.phone}</p>
                      <p>Email: {userDetails.email}</p>
                      <p>Pick Up Point: {userDetails.pickUp}</p>
                    </>
                  )}

                  {/* If userDetails don't exist, show input fields */}
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
                {/* Button to save shipping details */}
                <button
                  type="button"
                  onClick={() => saveDetails(userName, phone, pickUp)}
                >
                  Save Details
                </button>
                <p>Total Price : {totalPrice}</p> {/* Show total price */}
                {/* Show payment and clear cart options if user details exist */}
                {userDetails && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart(); // Clear the cart
                      }}
                    >
                      Clear Cart
                    </button>

                    {/* Render IntaSendButton for payment if totalPrice is available */}
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

export default Cart; // Export the Cart component as default
