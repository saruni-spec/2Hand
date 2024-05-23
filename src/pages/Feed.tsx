import "../styles.css";
import Nav from "../components/Nav";
import uniform2 from "../assets/images/uniform2.jpg";
import uniform from "../assets/images/uniform.jpg";
import dress from "../assets/images/dress.jpg";
import sweater from "../assets/images/sweater.jpg";
import shirts2 from "../assets/images/shirts2.png";
import pants from "../assets/images/pants.jpg";
import skirt5 from "../assets/images/skirt5.jpg";
import uniform4 from "../assets/images/uniform4.jpg";
import shorts from "../assets/images/shorts.jpg";
import shoes3 from "../assets/images/shoes3.jpg";
import sports from "../assets/images/sports.jpg";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Feed = () => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]); // Array to store refs for each image element

  // Function to handle IntersectionObserver callback
  const handleIntersection = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const imageRef = entry.target as HTMLElement;
        const imageUrl = imageRef.dataset.src; // Get image URL from data-src attribute

        // Add a smooth transition effect
        imageRef.style.transition = "background-image 0.5s ease-in-out";

        imageRef.style.backgroundImage = `url(${imageUrl})`;
        observer.unobserve(imageRef); // Stop observing after loading
      }
    });
  };

  // Intersection Observer setup inside useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);

    imageRefs.current.forEach((imageRef) => {
      if (imageRef) {
        observer.observe(imageRef);
      }
    });

    // Cleanup function to disconnect observer on unmount
    return () => observer.disconnect();
  }, []); // Observe changes in imageRefs

  const navigate = useNavigate();

  const navigateToShop = (category: string) => {
    navigate(`/shop/${category}`);
  };

  return (
    <>
      <Nav />
      <div className="homeDiv">
        <div
          style={{ backgroundImage: `url(${uniform})` }}
          className="fullDiv"
          onClick={() => {
            navigateToShop("");
          }}
        >
          <p>Shop Now</p>
        </div>
        <div className="fullDiv">
          <p>
            Our mission is to provide students and parents with affordable,
            reliable uniform solutions, ensuring comfort, style, and durability
            throughout the school year
          </p>
        </div>

        <div className="dualDiv">
          <div
            className="ImageDiv"
            ref={(el) => (imageRefs.current[0] = el)} // Store ref in array
            data-src={uniform2}
            style={{
              backgroundColor: "#f0f0f0",
            }}
            onClick={() => {
              navigateToShop("female");
            }}
          >
            <p>female</p>
          </div>
          <div
            ref={(el) => (imageRefs.current[1] = el)} // Store ref in array
            data-src={uniform4}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }} // Placeholder
            onClick={() => {
              navigateToShop("male");
            }}
          >
            <p>male</p>
          </div>
        </div>

        <div className="grid">
          <div
            ref={(el) => (imageRefs.current[2] = el)} // Store ref in array
            data-src={sweater}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }} // Placeholder
            onClick={() => {
              navigateToShop("sweater");
            }}
          >
            <p>sweaters</p>
          </div>
          <div
            ref={(el) => (imageRefs.current[3] = el)} // Store ref in array
            data-src={shirts2}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }}
            onClick={() => {
              navigateToShop("shirt");
            }}
          >
            <p>shirts</p>
          </div>
          <div
            ref={(el) => (imageRefs.current[4] = el)} // Store ref in array
            data-src={pants}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }}
            onClick={() => {
              navigateToShop("pants");
            }}
          >
            <p>pants</p>
          </div>
          <div
            ref={(el) => (imageRefs.current[5] = el)} // Store ref in array
            data-src={shorts}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }}
            onClick={() => {
              navigateToShop("shorts");
            }}
          >
            <p>shorts</p>
          </div>
          <div
            ref={(el) => (imageRefs.current[6] = el)} // Store ref in array
            data-src={skirt5}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }}
            className="ImageDiv"
            onClick={() => {
              navigateToShop("skirt");
            }}
          >
            <p>skirts</p>
          </div>
          <div
            ref={(el) => (imageRefs.current[7] = el)} // Store ref in array
            data-src={dress}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }}
            onClick={() => {
              navigateToShop("dress");
            }}
          >
            <p>dresses</p>
          </div>
        </div>

        <div>
          <div
            className="fullDiv"
            ref={(el) => (imageRefs.current[8] = el)} // Store ref in array
            data-src={sports}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }}
            onClick={() => {
              navigateToShop("sports");
            }}
          >
            <p>sports wear</p>
          </div>
        </div>

        <div>
          <div
            className="fullDiv"
            ref={(el) => (imageRefs.current[9] = el)} // Store ref in array
            data-src={shoes3}
            style={{
              backgroundColor: "#f0f0f0",
              backgroundImage:
                'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
            }}
            onClick={() => {
              navigateToShop("shoes");
            }}
          >
            <p>shoes</p>
          </div>
        </div>

        <div className="fullDiv">
          <p>
            Explore our wide selection today and experience hassle-free shopping
            for all your uniform needs!" Whether you're seeking brand new
            apparel or budget-friendly second-hand options, we've got you
            covered
          </p>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Feed;
