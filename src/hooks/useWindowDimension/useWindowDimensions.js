import { useEffect, useState } from "react";

export const useWindowDimensions = () => {
  const getWindowDimensions = () => {
    const { innerHeight, innerWidth } = window;
    return { innerHeight, innerWidth };
  };

  const [windowDimension, setWindowDimension] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimension(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimension;
};
