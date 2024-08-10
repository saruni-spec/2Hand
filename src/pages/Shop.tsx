import { useState } from "react";

import "../shop.css";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Query,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";

import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ImagePreview from "../components/ImagePreview";
import { useQuery } from "react-query";
import { useUser } from "../context/UserContext";

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

const fetchUniformData = async (filterType: any, filterValue: any) => {
  let filterQuery: Query<DocumentData> | CollectionReference<DocumentData> =
    collection(db, "uniforms");

  console.log("fetching uniforms");
  filterQuery = query(collection(db, "uniforms"));

  if (filterType === "type") {
    filterQuery = query(
      collection(db, "uniforms"),
      where("clothType", "==", filterValue)
    );
  }
  if (filterType === "gender") {
    filterQuery = query(
      collection(db, "uniforms"),
      where("gender", "==", filterValue)
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

  return { uniforms: newUniform };
};

const Shop = () => {
  const { filterType, filterValue } = useParams();
  const { addToCart } = useUser();

  const [viewItem, setViewItem] = useState<UniformType | null>(null);
  const [preview, setPreview] = useState(false);

  const viewCurrentItem = (uniform: UniformType | null) => {
    setViewItem(uniform);
    setPreview(!preview);
  };

  const { data, isLoading, error } = useQuery(
    [filterType, filterValue],
    () => fetchUniformData(filterType, filterValue),
    {
      staleTime: 180000,
      refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
    }
  );
  const uniforms = data?.uniforms || [];
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <>
      {isLoading ? (
        <p>Loading uniforms</p>
      ) : (
        <>
          {!preview && !viewItem && (
            <>
              <ul className="shop-display">
                {uniforms &&
                  uniforms.map((uniform) => (
                    <li
                      className="shopItem"
                      key={uniform.id}
                      onClick={() => {
                        viewCurrentItem(uniform);
                      }}
                    >
                      <img src={uniform.image} alt="" loading="lazy"></img>
                      <p>
                        <strong>{uniform.type}</strong>
                      </p>

                      <p>
                        <span> {uniform.price} ksh </span>
                      </p>
                      <p>
                        available(
                        {uniform.quantity})
                      </p>
                    </li>
                  ))}
              </ul>
            </>
          )}

          {preview && viewItem && (
            <div className="preview">
              <button
                type="button"
                onClick={() => {
                  viewCurrentItem(null);
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
                  <strong>Price: {viewItem.price} ksh </strong>
                </p>
                <p>
                  <span>Description: {viewItem.description}</span>
                </p>
                <p>
                  <span>Size: {viewItem.size}</span>
                </p>
                <p>Color: {viewItem.color}</p>
                <p>Type: {viewItem.type}</p>
                <p>Label: {viewItem.label}</p>

                <p>Category: {viewItem.category}</p>
                <p>
                  available:
                  {viewItem.quantity}
                </p>
                <button type="button" onClick={() => addToCart(viewItem)}>
                  Add to cart <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Shop;
