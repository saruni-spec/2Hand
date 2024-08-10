import "../styles.css";

import uniform2 from "../assets/images/uniform2.jpg";

import dress from "../assets/images/dress.jpg";
import sweater from "../assets/images/sweater.jpg";
import shirts2 from "../assets/images/shirts2.png";
import pants from "../assets/images/pants.jpg";
import skirt5 from "../assets/images/skirt5.jpg";
import uniform4 from "../assets/images/uniform4.jpg";
import shorts from "../assets/images/shorts.jpg";
import shoes3 from "../assets/images/shoes3.jpg";
import sports from "../assets/images/sports.jpg";

import blackavif from "../assets/images/black.avif";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    if (category === "all") {
      navigate("/shop");
      return;
    }
    if (category === "female" || category === "male") {
      navigate(`/shop/gender/${category}`);
      return;
    }

    navigate(`/shop/type/${category}`);
  };

  return (
    <>
      <div className="hero">
        <div className="heroDiv">
          <div className="hero-content">
            <h3>Affordable Uniforms Without Compromise</h3>
            <h3>Find Your Perfect Fit Today</h3>
            <p>
              Browse our extensive collection, featuring both new and
              budget-friendly second-hand options.
            </p>
          </div>
          <img
            src={blackavif}
            className="homeUniform"
            alt="uniform sizes for everyone"
          />
        </div>
        <p
          className="hero-p"
          onClick={() => {
            navigateToShop("all");
          }}
        >
          Shop Now
        </p>
      </div>

      <div className="missionDiv">
        <p className="visible">
          Our mission is to provide students and parents with affordable,
          reliable uniform solutions, ensuring comfort, style, and durability
          throughout the school year
        </p>
      </div>
      <div className="category">
        <span className="line"></span>
        <h2>Top Categories</h2>
        <span className="line"></span>
      </div>

      <div className="dualDiv">
        <p>Female Section</p>
        <div
          className="ImageDiv"
          ref={(el) => (imageRefs.current[0] = el)} // Store ref in array
          data-src={uniform2}
          style={{
            backgroundColor: "#f0f0f0",
          }}
        >
          <p
            className="nav-p"
            onClick={() => {
              navigateToShop("female");
            }}
          >
            Shop
          </p>
        </div>
        <div
          className="ImageDiv"
          ref={(el) => (imageRefs.current[1] = el)} // Store ref in array
          data-src={uniform4}
          style={{
            backgroundColor: "#f0f0f0",
            backgroundImage:
              'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
          }} // Placeholder
        >
          <p
            className="nav-p"
            onClick={() => {
              navigateToShop("male");
            }}
          >
            Shop
          </p>
        </div>
        <p>Male Section</p>
      </div>
      <div className="category">
        <span className="line"></span>
        <h2> Browse </h2>
        <span className="line"></span>
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
          <span className="label">Sweaters</span>
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
          <span className="label">Shirts</span>
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
          <span className="label">Trousers</span>
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
          <span className="label">Shorts</span>
        </div>
        <div
          ref={(el) => (imageRefs.current[6] = el)} // Store ref in array
          data-src={skirt5}
          style={{
            backgroundColor: "#f0f0f0",
            backgroundImage:
              'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")',
          }}
          onClick={() => {
            navigateToShop("skirt");
          }}
        >
          <span className="label">Skirts</span>
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
          <span className="label">Dresses</span>
        </div>
      </div>

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
        <span className="label">Sports</span>
      </div>

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
        <span className="label"> Shoes</span>
      </div>

      <div className="fullDiv">
        <p className="visible">
          Explore our wide selection today and experience hassle-free shopping
          for all your uniform needs!" Whether you're seeking brand new apparel
          or budget-friendly second-hand options, we've got you covered
        </p>
      </div>
    </>
  );
};

export default Feed;
