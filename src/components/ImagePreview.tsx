import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../imagepreview.css";

// Define the props interface to expect an array of image URLs
interface ImagePreviewProps {
  image: string[];
}

// Component to preview a list of images and allow navigation through them
const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
  // Manage the index of the currently displayed image
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next image. Uses modulo to wrap around if at the end of the list
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
  };

  // Function to move to the previous image. Also uses modulo to wrap around if at the start of the list
  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + image.length) % image.length
    );
  };

  return (
    <div className="image-preview">
      {/* Conditionally render the image if it exists in the array */}
      {image[currentIndex] && <img src={image[currentIndex]} alt="Preview" />}

      {/* Buttons to navigate between images */}
      <div className="buttonGroup">
        {/* Previous button. Disabled if there is only one image */}
        <button
          type="button"
          onClick={handlePrevImage}
          disabled={image.length <= 1}
        >
          <p>Previous</p>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        {/* Next button. Disabled if there is only one image */}
        <button
          type="button"
          onClick={handleNextImage}
          disabled={image.length <= 1}
        >
          <p>Next</p>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
