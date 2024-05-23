import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const LazyBackground = (imageUrl: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const { ref, inView } = useInView({ threshold: 0.5 }); // Observe 50% of the element

  useEffect(() => {
    if (inView) {
      const element = elementRef.current;
      if (element) {
        element.style.backgroundImage = `url(${imageUrl})`;
        setIsVisible(true);
      }
    }
  }, [inView, imageUrl]);

  return { isVisible, ref };
};

export default LazyBackground;
