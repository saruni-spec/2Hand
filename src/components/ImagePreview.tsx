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

  console.log(image, "image list");
  return (
    <div className="image-preview">
      <button
        type="button"
        onClick={handlePrevImage}
        disabled={image.length <= 1}
      >
        <p>Previous</p>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {image[currentIndex] && <img src={image[currentIndex]} alt="Preview" />}
      <button
        type="button"
        onClick={handleNextImage}
        disabled={image.length <= 1}
      >
        <p>Next</p>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default ImagePreview;
