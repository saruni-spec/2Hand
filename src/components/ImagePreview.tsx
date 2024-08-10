import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
interface ImagePreviewProps {
  image: string[];
}
import "../imagepreview.css";

const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + image.length) % image.length
    );
  };

  return (
    <div className="image-preview">
      {image[currentIndex] && <img src={image[currentIndex]} alt="Preview" />}
      <div className="buttonGroup">
        <button
          type="button"
          onClick={handlePrevImage}
          disabled={image.length <= 1}
        >
          <p>Previous</p>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
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
