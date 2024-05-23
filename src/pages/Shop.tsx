import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import "../styles.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Query,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { SignUpLogin } from "../components/signup";

type UniformType = {
  category: string;
  image: string;
  price: number;
  quantity: number;
  label: string;
  size: string;
};

const Shop = () => {
  const navigate = useNavigate();
  const { filter } = useParams();
  const [uniforms, setUniforms] = useState<
    {
      image: string;
      price: number;
      quantity: number;
      label: string;
      category: string;
      size: string;
      id: string;
    }[]
  >([]);

  const fetchUniformData = async () => {
    let filterQuery: Query<DocumentData> | CollectionReference<DocumentData> =
      collection(db, "uniforms");

    if (filter) {
      console.log(filter, "filter");
      filterQuery = query(
        collection(db, "uniforms"),
        where("label", "==", filter)
      );
    }
    const querySnapshot = await getDocs(filterQuery);
    const newUniform: {
      image: string;
      price: number;
      quantity: number;
      label: string;
      category: string;
      size: string;
      id: string;
    }[] = [];

    querySnapshot.forEach((doc) => {
      const entry = {
        image: doc.data().image,
        price: doc.data().price,
        quantity: doc.data().quantity,
        size: doc.data().size,
        category: doc.data().category,
        label: doc.data().label,
        id: doc.id,
      };
      newUniform.push(entry);
    });

    setUniforms(newUniform);
  };

  const noGenerator = () => {
    let randomNumberString = "";
    for (let i = 0; i < 10; i++) {
      randomNumberString += Math.floor(Math.random() * 10); // Generate digits between 0-9
    }
    return randomNumberString;
  };

  useEffect(() => {
    console.log("fetching data", filter);
    fetchUniformData();
    console.log(uniforms);
  }, []);

  const AddToCart = async (uniform: UniformType) => {
    let user = auth.currentUser;
    let user_temp: string | null | undefined;
    console.log(user?.email, "user is here");
    if (user) {
      user_temp = user.email;
    } else {
      SignUpLogin("guest" + noGenerator() + "@gmail.com", "password");
      user = auth.currentUser;
      auth.onAuthStateChanged((user) => {
        user_temp = user?.email;
      });
    }

    try {
      const docRef = await addDoc(collection(db, "Cart"), {
        image: uniform.image,
        price: uniform.price,
        quantity: uniform.quantity,
        label: uniform.label,
        category: uniform.category,
        size: uniform.size,
        user: user_temp,
      });

      navigate("/cart");

      console.log("Document written with ID: ", docRef.id);
      console.log("Added to cart", user_temp);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Nav />
      <div className="homeDiv">
        <ul className="displayList">
          {uniforms.map((uniform) => (
            <li key={uniform.id}>
              <img src={uniform.image} alt="" loading="lazy"></img>
              <button
                type="button"
                onClick={() => {
                  AddToCart(uniform);
                }}
              >
                <h4>{uniform.price} ksh </h4>
                <p>
                  {uniform.label},{uniform.size},{uniform.category},available(
                  {uniform.quantity})
                </p>
                <br />
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default Shop;
