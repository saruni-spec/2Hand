import React, { useState } from "react";

import "../form.css";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../components/ImagePreview";
import { useUser } from "../context/UserContext";

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
  gender?: string;
}

const AddItem = () => {
  const [item, setItem] = useState<ItemData | null>(null); // State to store form data once it's ready to submit
  const [confirm, setConfirm] = useState(false); // State to handle confirmation of form submission
  const navigate = useNavigate(); // Allows redirecting users to different pages
  const [isLoading, setIsLoading] = useState(false); // State to handle loading indicator
  const { user } = useUser(); // Get current logged-in user details

  // Form submission handler
  const AddUniform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
      return;
    }

    // Extracting file input values
    const form = e.currentTarget;
    const file1 = form.image1.files?.[0]; // Primary image file
    let file2 = form.image2.files?.[0]; // Secondary image file (optional)
    let file3 = form.image3.files?.[0]; // Tertiary image file (optional)

    // Ensuring all file inputs are filled by duplicating the first file if others are missing
    if (file1) {
      if (!file2) {
        file2 = file1;
      }
      if (!file3) {
        file3 = file1;
      }

      // Set the item state with the collected form data
      setItem({
        clothType: form.clothType.value,
        description: form.description.value,
        image: file1,
        image1: file2,
        image2: file3,
        price: form.price.value,
        category: form.category.value,
        label: form.label.value,
        quantity: form.quantity.value,
        size: form.size.value,
        color: form.color.value,
        gender: form.gender.value,
      });
      setConfirm(true); // Show confirmation UI
    }
  };

  // Function to post the item to Firebase (Firestore and Storage)
  const postItem = async (item: ItemData) => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
      return;
    }

    setIsLoading(true); // Start loading animation while uploading

    try {
      const storage = getStorage(); // Initialize Firebase Storage

      // Upload images to Firebase Storage and get their URLs
      const storageRef1 = ref(storage, `uniforms/${item.clothType}`); // Reference for first image
      await uploadBytes(storageRef1, item.image);
      const downloadURL1 = await getDownloadURL(storageRef1); // Get URL for first image

      const storageRef2 = ref(storage, `uniforms/${item.clothType}`); // Reference for second image
      await uploadBytes(storageRef2, item.image1);
      const downloadURL2 = await getDownloadURL(storageRef2); // Get URL for second image

      const storageRef3 = ref(storage, `uniforms/${item.clothType}`); // Reference for third image
      await uploadBytes(storageRef3, item.image2);
      const downloadURL3 = await getDownloadURL(storageRef3); // Get URL for third image

      // Add the item data and image URLs to the Firestore database
      await addDoc(collection(db, "uniforms"), {
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
        gender: item.gender,
        seller: user.uid, // Associate the item with the current user
      });

      // Reset states after successful upload
      setConfirm(false);
      setItem(null); // Clear item state
      setImageList([]); // Clear image previews
      setIsLoading(false); // Stop loading indicator
    } catch (e) {
      console.error("Error adding document: ", e); // Log error if upload fails
    }
  };

  // States to manage form field values for the form controls
  const [itemType, setItemType] = useState("Type");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Category");
  const [label, setLabel] = useState("none");
  const [quantity, setQuantity] = useState("1");
  const [size, setSize] = useState("Size");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("both");
  const [imageList, setImageList] = useState<string[]>([]); // To store and preview uploaded images

  return (
    <>
      {isLoading ? (
        <div className="loader"></div> // Display loading indicator while fetching user
      ) : !confirm ? (
        <form className="uniform-form" onSubmit={AddUniform}>
          <label>
            Cloth Type
            <select
              name="clothType"
              id="clothType"
              title="Cloth Type"
              required
              defaultValue={itemType}
              onChange={(e) => setItemType(e.target.value)}
            >
              <option value="">Select Item Type</option>
              <option value="shirt">Shirt</option>
              <option value="sweater">Sweater</option>
              <option value="tie">Tie</option>
              <option value="shorts">Shorts</option>
              <option value="skirt">Skirt</option>
              <option value="dress">Dress</option>
              <option value="pants">Pants</option>
              <option value="trackSuit">Track Suit</option>
              <option value="socks">Socks</option>
              <option value="shoes">Shoes</option>
              <option value="sports">Sports</option>
              <option value="tshirt">T-Shirt</option>
            </select>
          </label>

          <label>
            Description
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={description}
              placeholder="Enter Item Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Category
            <select
              title="category"
              name="category"
              id="category"
              required
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Item Category</option>
              <option value="kindergarten">Kindergarten</option>
              <option value="lowerSchool">Lower School</option>
              <option value="middleSchool">Middle School</option>
              <option value="juniorHigh">Junior High</option>
              <option value="seniorHigh">Senior High</option>
              <option value="college">College</option>
            </select>
          </label>

          <label>
            Label
            <input
              type="text"
              name="label"
              id="label"
              defaultValue={label}
              placeholder="Enter School if label present"
              onChange={(e) => setLabel(e.target.value)}
            />
          </label>

          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              id="quantity"
              defaultValue={quantity}
              placeholder="Enter Item Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          <label>
            Size
            <select
              title="size"
              name="size"
              id="size"
              required
              defaultValue={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Item Size</option>
              <option value="very small">Very Small</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="very large">Very Large</option>
            </select>
          </label>

          <label>
            Color
            <p>Select Color</p>
            <input
              required
              title="select color"
              name="color"
              id="color"
              type="color"
              defaultValue={color}
              placeholder="Enter Item Color"
              onChange={(e) => setColor(e.target.value)}
            />
          </label>

          <div className="radioGroup">
            {gender}
            <label htmlFor="both">
              All
              <input
                type="radio"
                id="both"
                name="gender"
                value="both"
                onChange={() => setGender("both")}
              />
            </label>
            <label htmlFor="male">
              Male
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={() => setGender("male")}
              />
            </label>
            <label htmlFor="female">
              Female
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={() => setGender("female")}
              />
            </label>
          </div>

          <label>
            Images
            <div id="image-input">
              <input
                required
                type="file"
                name="image1"
                id="image1"
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
                name="image2"
                id="image2"
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
                name="image3"
                id="image3"
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
          </label>
          <label>
            Price
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={price}
              placeholder="Enter Item Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
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
                  <p>Gender : {item.gender}</p>
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
    </>
  );
};

export default AddItem;
