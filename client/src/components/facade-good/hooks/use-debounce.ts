import { useEffect, useRef } from "react";

const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: any[]
) => {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, delay);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, dependencies);
};

export default useDebounce;