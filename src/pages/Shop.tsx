import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import "../shop.css";
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
import Filter from "../components/filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ImagePreview from "../components/ImagePreview";

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

const Shop = () => {
  const navigate = useNavigate();
  const { filterType, filterValue } = useParams();
  const [uniforms, setUniforms] = useState<
    {
      image: string;
      image1: string;
      image2: string;
      price: number;
      quantity: number;
      label: string;
      category: string;
      size: string;
      id: string;
      type: string;
      color: string;
      description: string;
      seller: string;
    }[]
  >([]);

  const fetchUniformData = async () => {
    let filterQuery: Query<DocumentData> | CollectionReference<DocumentData> =
      collection(db, "uniforms");

    if (filterType) {
      console.log(filterType, filterValue);
      filterQuery = query(
        collection(db, "uniforms"),
        where(filterType, "==", filterValue)
      );
    }
    const querySnapshot = await getDocs(filterQuery);
    const newUniform: {
      image: string;
      image1: string;
      image2: string;
      price: number;
      quantity: number;
      label: string;
      category: string;
      size: string;
      id: string;
      type: string;
      color: string;
      description: string;
      seller: string;
    }[] = [];

    querySnapshot.forEach((doc) => {
      const entry = {
        image: doc.data().image1,
        image1: doc.data().image2,
        image2: doc.data().image3,
        price: doc.data().price,
        quantity: doc.data().quantity,
        size: doc.data().size,
        category: doc.data().category,
        label: doc.data().label,
        type: doc.data().clothType,
        color: doc.data().color,
        id: doc.id,
        description: doc.data().description,
        seller: doc.data().seller,
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
    fetchUniformData();
  }, [filterType, filterValue]);
  useEffect(() => {
    console.log(uniforms);
  }, [uniforms]);

  const AddToCart = async (uniform: UniformType) => {
    let user = auth.currentUser;
    let user_temp: string | null | undefined;
    console.log(user?.email, "user is here");
    console.log(uniform, "uniform is here");
    if (!user) {
      SignUpLogin("guest" + noGenerator() + "@gmail.com", "user");
      user = auth.currentUser;
      auth.onAuthStateChanged((user) => {
        user_temp = user?.email;
      });
    }
    user_temp = user?.email;

    if (user && user.uid === uniform.seller) {
      alert("You can't buy your own item");
      return;
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
        type: uniform.type,
        color: uniform.color,
        description: uniform.description,
        seller: uniform.seller,
      });

      navigate("/cart");

      console.log("Document written with ID: ", docRef.id);
      console.log("Added to cart", user_temp);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleFilterChange = (newFilter: string, attribute: string) => {
    navigate(`/shop/${attribute}/${newFilter}`);
  };
  const [viewItem, setViewItem] = useState<UniformType | null>(null);
  const [preview, setPreview] = useState(false);

  const viewCurrentItem = (uniform: UniformType) => {
    setViewItem(uniform);
    setPreview(true);
  };
  return (
    <>
      <Nav />
      <div className="homeDiv">
        {!preview && !viewItem && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Filter setFilter={handleFilterChange} />
            <ul className="shop-display">
              {uniforms.map((uniform) => (
                <li
                  key={uniform.id}
                  onClick={() => {
                    viewCurrentItem(uniform);
                  }}
                >
                  <img src={uniform.image} alt="" loading="lazy"></img>

                  <p>
                    <b>{uniform.price} ksh </b>
                    ,<br />
                    available(
                    {uniform.quantity})
                  </p>
                  <br />
                </li>
              ))}
            </ul>
          </div>
        )}

        {preview && viewItem && (
          <div className="preview">
            <button
              type="button"
              onClick={() => {
                setPreview;
              }}
              className="close-preview"
            >
              <p> Close</p>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <div id="preview-img">
              <ImagePreview
                image={[viewItem.image, viewItem.image1, viewItem.image2]}
              />
            </div>
            <div id="data-div">
              <p>
                <b>Price: {viewItem.price} ksh </b>
                <br />
                Description: {viewItem.description}
                <br />
                Color: {viewItem.color}
                <br />
                Type: {viewItem.type}
                <br />
                Label: {viewItem.label}
                <br />
                Size: {viewItem.size}
                <br />
                Category: {viewItem.category}
                <br />
                available(
                {viewItem.quantity})
              </p>
              <button type="button" onClick={() => AddToCart(viewItem)}>
                Add to cart <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
