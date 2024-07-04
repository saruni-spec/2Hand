import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { auth, db } from "../firebase";
import {
  CollectionReference,
  DocumentData,
  Query,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import ImagePreview from "../components/ImagePreview";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

interface Data {
  clothType: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  price: number;
  quantity: number;
  label: string;
  category: string;
  size: string;
  seller: string;
  color: string;
}

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<{
    userName: string | null;
    email: string | null;
    photoURL: string | null;
    phoneNumber: string;
    address: string;
    town: string;
    city: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [sales, setSales] = useState<Data[]>([]);
  const [purchases, setPurchases] = useState<Data[]>([]);
  const [currentSection, setCurrentSection] = useState("profile");

  const getUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const profileQuery:
        | Query<DocumentData>
        | CollectionReference<DocumentData> = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(profileQuery);

      if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];
        const Profile = {
          userName: doc.data().userName,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          phoneNumber: doc.data().phoneNumber,
          address: doc.data().address,
          town: doc.data().town,
          city: doc.data().city,
        };
        setUser(Profile);
      } else {
        const Profile = {
          userName: "",
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: "",
          address: "",
          town: "",
          city: "",
        };
        setUser(Profile);
      }
    } else {
      navigate("/login");
    }
  };

  const setSection = (section: string) => {
    setCurrentSection(section);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          getUserData();
        } else {
          navigate("/login");
        }
      });

      setIsLoading(false);
      console.log("User", user);

      return () => unsubscribe();
    }, 1500);

    return () => clearInterval(timeout);
  }, [isLoading]);

  const userSales = async () => {
    if (!user) return;

    try {
      const salesQuery:
        | Query<DocumentData>
        | CollectionReference<DocumentData> = query(
        collection(db, "uniforms"),
        where("seller", "==", user.email)
      );
      const querySnapshot = await getDocs(salesQuery);

      if (querySnapshot.empty) {
        console.log("No sales found");
        return;
      }
      const sales: Data[] = [];
      querySnapshot.forEach((doc) => {
        const sale = {
          clothType: doc.data().clothType,
          description: doc.data().description,
          image1: doc.data().image1,
          image2: doc.data().image2,
          image3: doc.data().image3,
          price: doc.data().price,
          quantity: doc.data().quantity,
          label: doc.data().label,
          category: doc.data().category,
          size: doc.data().size,
          seller: doc.data().seller,
          color: doc.data().color,
        };

        sales.push(sale);
      });
      setSales(sales);
    } catch (error) {
      console.log("Error fetching sales", error);
    }
  };

  const salesSection = () => {
    userSales();
    setCurrentSection("sales");
  };

  const userPurchases = async () => {
    if (!user) return;
    try {
      const purchasesQuery:
        | Query<DocumentData>
        | CollectionReference<DocumentData> = query(
        collection(db, "purchases"),
        where("buyer", "==", user.email)
      );
      const querySnapshot = await getDocs(purchasesQuery);

      if (querySnapshot.empty) {
        console.log("No purchases found");
        return;
      }
      const purchases: Data[] = [];
      querySnapshot.forEach((doc) => {
        const purchase = {
          clothType: doc.data().clothType,
          description: doc.data().description,
          image1: doc.data().image1,
          image2: doc.data().image2,
          image3: doc.data().image3,
          price: doc.data().price,
          quantity: doc.data().quantity,
          label: doc.data().label,
          category: doc.data().category,
          size: doc.data().size,
          seller: doc.data().seller,
          color: doc.data().color,
        };
        purchases.push(purchase);
      });
      setPurchases(purchases);
    } catch (error) {
      console.log("Error fetching purchases", error);
    }
  };

  const purchasesSection = () => {
    userPurchases();
    setCurrentSection("purchases");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("submitting form");
    const user = auth.currentUser;
    if (user) {
      const form = e.currentTarget;
      const photo = form.photo.files[0];
      const userName = form.userName.value;
      const email = form.email.value;
      const phoneNumber = form.phoneNumber.value;
      const town = form.town.value;
      const city = form.city.value;
      const address = form.address.value;

      console.log(
        "Form data",
        userName,
        email,
        phoneNumber,
        town,
        city,
        address
      );

      const storage = getStorage();
      const storageRef1 = ref(storage, `user-photos/${user.email}`);
      let downloadURL1 = await getDownloadURL(storageRef1);
      if (photo) {
        // Upload the image to Firebase Storage
        // Get the download URL of the uploaded image

        await uploadBytes(storageRef1, photo);
        downloadURL1 = await getDownloadURL(storageRef1);

        updateProfile(user, {
          displayName: userName,
          photoURL: downloadURL1,
        })
          .then(() => {
            console.log("Profile updated");
          })
          .catch((error) => {
            console.log(error);
            // ...
          });
      }

      const userQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      // Perform the query and get the document snapshot
      getDocs(userQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((user) => {
              const userDocRef = doc(db, "users", user.id);
              updateDoc(userDocRef, {
                userName,
                photoURL: downloadURL1,
                email,
                phoneNumber,
                address,
                town,
                city,
              });
            });
            console.log("User Profile updated");
          } else {
            // Document does not exist, create a new one
            setDoc(doc(collection(db, "users")), {
              email,
              phoneNumber,
              address,
              town,
              city,
              userName,
              photoURL: downloadURL1,
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error updating profile", error);
        });
    }
  };

  return (
    <>
      <Nav />
      <div className="homeDiv">
        <ul className="section">
          <li
            onClick={() => {
              setSection("profile");
            }}
          >
            Profile
          </li>
          <li onClick={salesSection}>Sales</li>
          <li onClick={purchasesSection}>Purchases</li>
        </ul>
        {isLoading && <div className="loader"></div>}

        {!isLoading && user && (
          <div className="profile">
            {currentSection === "profile" && (
              <form className="myProfile" onSubmit={handleSubmit}>
                <div id="profileImage">
                  <div id="photo-div">
                    <img
                      src={user?.photoURL || undefined}
                      alt="profile photo"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <label htmlFor="photo">Photo</label>

                    <input type="file" id="photo" name="photo" />
                  </div>
                </div>
                <div>
                  <label htmlFor="userName">Name</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    defaultValue={user?.userName || undefined}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user?.email || undefined}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={user?.phoneNumber}
                  />
                </div>
                <div>
                  <label htmlFor="town">Town</label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    defaultValue={user?.town}
                  />
                </div>
                <div>
                  <label htmlFor="city">City</label>
                  <input
                    type="city"
                    id="city"
                    name=""
                    defaultValue={user?.city}
                  />
                </div>
                <div>
                  <label htmlFor="address">Adress</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={user?.address}
                  />
                </div>
                <div>
                  <button type="submit">
                    Save Changes
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  </button>
                </div>
              </form>
            )}
            {currentSection === "sales" && (
              <div className="receipt">
                {sales.length > 0 && (
                  <ul>
                    {sales.map((sale, index) => (
                      <li key={index}>
                        <ImagePreview
                          image={[sale.image1, sale.image2, sale.image3]}
                        />
                        <div>
                          <p>{sale.clothType}</p>
                          <p>{sale.price} ksh</p>
                          <p>{sale.quantity} available</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {sales.length === 0 && <p>No sales found</p>}
              </div>
            )}
            {currentSection === "purchases" && (
              <div className="receipt">
                {purchases.length === 0 && <p>No purchases found</p>}
                {purchases.length > 0 && (
                  <ul>
                    {purchases.map((purchase, index) => (
                      <li key={index}>
                        <ImagePreview
                          image={[
                            purchase.image1,
                            purchase.image2,
                            purchase.image3,
                          ]}
                        />

                        <div>
                          <p>{purchase.clothType}</p>
                          <p>{purchase.price} ksh</p>
                          <p>{purchase.quantity} available</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
