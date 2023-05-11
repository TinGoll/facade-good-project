import React, { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, []);

  return null;
};

export default ScrollToTop;
