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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user, "use cart 1");
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
  }, []);

  const clearCart = () => {
    setCart([]);
  };

  const removeItem = (sample: {
    image: string;
    price: number;
    quantity: number;
    label: string;
    category: string;
    size: string;
    user: string;
  }) => {
    const newCart = cart.filter((item) => item !== sample);
    setCart(newCart);
  };

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
                  <p>No of items({sample.quantity}),</p>
                  <p>{sample.label},</p>
                  <p>{sample.category}</p>
                  <button
                    type="button"
                    onClick={() => {
                      removeItem(sample);
                    }}
                  ></button>
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
