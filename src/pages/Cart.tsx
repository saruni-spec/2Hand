import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../styles.css";
import "../cart.css";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import IntaSendButton from "../components/Intasend";

const Cart = () => {
  const [cart, setCart] = useState<
    {
      image: string;
      price: number;
      quantity: number;
      label: string;
      category: string;
      size: string;
      user: string;
    }[]
  >([]);

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
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCartData();
      } else {
        setCart([]);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Nav />
      <div className="homeDiv">
        {cart.length === 0 && <p>Cart is empty</p>}
        {cart.length > 0 && (
          <div className="duo">
            <ul className="cart">
              {cart.map((sample) => (
                <li>
                  <img src={sample.image} alt="" />
                  <p>
                    <b>{sample.price} ksh</b>,
                  </p>
                  <p>No of items({sample.quantity}),</p>
                  <p>{sample.label},</p>
                  <p>{sample.category}</p>
                </li>
              ))}
            </ul>
            <div className="form">
              <p>Total No of items : {cart.length}</p>

              <p>Date : {new Date().toLocaleDateString("en-GB")}</p>
              <h4>Shipping Details</h4>
              <div>
                <p>Address : {}</p>
                <p>City : {}</p>
                <p>Pick Up Point : {}</p>
              </div>
              <p>Delivery Fee : {}</p>
              <p>Total Price : {}</p>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                  }}
                >
                  Clear Cart
                </button>

                <IntaSendButton amount="100" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
