import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../form.css";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

interface ItemData {
  clothType: string;
  description: string;
  image: File;
  price: string;
  category: string;
  label: string;
  quantity: string;
  size: string;
}

const AddItem = () => {
  const [item, setItem] = useState<ItemData | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const user = auth.currentUser;
      if (!user) {
        navigate(`/login`, { state: { from: "add-item" } });
      }
      setIsLoading(false); // Set loading to false after check
    }, 1000); // Delay by 1 second

    return () => clearTimeout(timeoutId); // Clear timeout on cleanup
  }, []);

  const AddUniform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget
      .elements as HTMLCollectionOf<HTMLInputElement>;
    const file = formElements[2].files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      setItem({
        clothType: formElements[0].value,
        description: formElements[1].value,
        image: file,
        price: formElements[3].value,
        category: formElements[4].value,
        label: formElements[5].value,
        quantity: formElements[6].value,
        size: formElements[7].value,
      });
      setConfirm(true);
    }
  };

  const postItem = async (item: ItemData) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `uniforms/${item.category}`);

        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, item.image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Save the item data, including the image download URL, to Firestore
        const docRef = await addDoc(collection(db, "uniforms"), {
          clothType: item.clothType,
          description: item.description,
          image: downloadURL,
          price: item.price,
          category: item.category,
          label: item.label,
          quantity: item.quantity,
          size: item.size,
          user: user.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        setConfirm(false);
        setItem(null);
        setImagePreview(null); // Clear the image preview
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("colour,codition...");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("middleShool,Highschool...");
  const [label, setLabel] = useState("school...");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("small,medium,large...");

  return (
    <>
      <Nav />
      <div className="homeDiv">
        {isLoading ? (
          <div className="loader"></div> // Display loading indicator while fetching user
        ) : !confirm ? (
          <form className="uniform-form" onSubmit={AddUniform}>
            <label>Type</label>
            <input
              type="text"
              placeholder="Enter Item Type"
              defaultValue={itemType}
              onChange={(e) => setItemType(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              defaultValue={description}
              placeholder="Enter Item Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Image</label>
            <input
              type="file"
              placeholder="upload image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setImagePreview(imageUrl);
                }
              }}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" />}
            <label>Price</label>
            <input
              type="number"
              defaultValue={price}
              placeholder="Enter Item Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Category</label>
            <input
              type="text"
              defaultValue={category}
              placeholder="Enter Item Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label>Label</label>
            <input
              type="text"
              defaultValue={label}
              placeholder="Enter School label if present"
              onChange={(e) => setLabel(e.target.value)}
            />
            <label>Quantity</label>
            <input
              type="number"
              defaultValue={quantity}
              placeholder="Enter Item Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Size</label>
            <input
              type="text"
              defaultValue={size}
              placeholder="Enter Item Size"
              onChange={(e) => setSize(e.target.value)}
            />
            <button type="submit">Add Item</button>
          </form>
        ) : (
          confirm &&
          item && (
            <div className="confirm">
              <div className="row1">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
              </div>
              <div className="row2">
                <ul>
                  <li>
                    <p>Type : {item.clothType}</p>
                  </li>
                  <li>
                    <p>Description : {item.description}</p>
                  </li>
                  <li>
                    <p>Price : {item.price}</p>
                  </li>
                  <li>
                    <p>Category : {item.category}</p>
                  </li>
                  <li>
                    <p>School label : {item.label}</p>
                  </li>
                  <li>
                    <p>Size : {item.size}</p>
                  </li>
                  <li>
                    <p>Quantity : {item.quantity}</p>
                  </li>
                </ul>
                <div className="row2buttons">
                  <button
                    type="button"
                    onClick={() => {
                      setConfirm(false);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      postItem(item);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AddItem;
