import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../form.css";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../components/ImagePreview";

interface ItemData {
  clothType: string;
  description: string;
  image: File;
  image1: File;
  image2: File;
  price: string;
  category: string;
  label: string;
  quantity: string;
  size: string;
  color?: string;
}

const AddItem = () => {
  const [item, setItem] = useState<ItemData | null>(null);
  const [confirm, setConfirm] = useState(false);

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
    const file1 = formElements[2].files?.[0];
    let file2 = formElements[3].files?.[0];
    let file3 = formElements[4].files?.[0];

    if (file1) {
      if (!file2) {
        file2 = file1;
      }
      if (!file3) {
        file3 = file1;
      }
      setItem({
        clothType: formElements[0].value,
        description: formElements[1].value,
        image: file1,
        image1: file2,
        image2: file3,
        price: formElements[5].value,
        category: formElements[6].value,
        label: formElements[7].value,
        quantity: formElements[8].value,
        size: formElements[9].value,
        color: formElements[10].value,
      });
      setConfirm(true);
    }
  };

  const postItem = async (item: ItemData) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const storage = getStorage();
        // Upload the image to Firebase Storage
        // Get the download URL of the uploaded image
        const storageRef1 = ref(storage, `uniforms/${item.category}`);
        await uploadBytes(storageRef1, item.image);
        const downloadURL1 = await getDownloadURL(storageRef1);

        const storageRef2 = ref(storage, `uniforms/${item.category}`);
        await uploadBytes(storageRef2, item.image);
        const downloadURL2 = await getDownloadURL(storageRef2);

        const storageRef3 = ref(storage, `uniforms/${item.category}`);
        await uploadBytes(storageRef3, item.image);
        const downloadURL3 = await getDownloadURL(storageRef3);

        // Save the item data, including the image download URL, to Firestore
        const docRef = await addDoc(collection(db, "uniforms"), {
          clothType: item.clothType,
          description: item.description,
          image1: downloadURL1,
          image2: downloadURL2,
          image3: downloadURL3,
          price: item.price,
          category: item.category,
          label: item.label,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          user: user.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        setConfirm(false);
        setItem(null);
        setImageList([]); // Clear the image preview
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [label, setLabel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [imageList, setImageList] = useState<string[]>([]);

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

            <label>Images</label>
            <div id="image-input">
              <input
                type="file"
                placeholder="upload image"
                onChange={(e) => {
                  const file1 = e.target.files?.[0];
                  if (file1) {
                    const imageUrl1 = URL.createObjectURL(file1);
                    setImageList((prev) => [...prev, imageUrl1]);
                  }
                }}
              />

              <input
                type="file"
                placeholder="upload image"
                onChange={(e) => {
                  const file2 = e.target.files?.[0];
                  if (file2) {
                    const imageUrl2 = URL.createObjectURL(file2);
                    setImageList((prev) => [...prev, imageUrl2]);
                  }
                }}
              />

              <input
                type="file"
                placeholder="upload image"
                onChange={(e) => {
                  const file3 = e.target.files?.[0];
                  if (file3) {
                    const imageUrl3 = URL.createObjectURL(file3);
                    setImageList((prev) => [...prev, imageUrl3]);
                  }
                }}
              />
            </div>
            {imageList && <ImagePreview image={imageList} />}

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
            <label>Color</label>
            <input
              type="text"
              defaultValue={color}
              placeholder="Enter Item Color"
              onChange={(e) => setColor(e.target.value)}
            />
            <button type="submit">Add Item</button>
          </form>
        ) : (
          confirm &&
          item && (
            <div className="confirm">
              <div className="row1">
                <ImagePreview image={imageList} />
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
                  <li>
                    <p>Color : {item.color}</p>
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
