import { RefObject, useEffect, useState } from "react";
import { useThrottleTrailing } from "./useThrottle";

const useElementPosition = (el: RefObject<HTMLElement>, delay: number = 0) => {
  const getElement = (x: number, y: number): { x: number; y: number } => {
    return {
      x: x,
      y: y,
    };
  };

  const [elementPosition, setElementPosition] = useState<any>(getElement);

  const handlePosition = () => {
    if (el.current === null) return;
    let element = el.current;
    let x = element!.getBoundingClientRect().left + element!.offsetWidth / 2;
    let y = element!.getBoundingClientRect().top + element!.offsetHeight / 2;
    setElementPosition(getElement(x, y));
  };

  const throttle = useThrottleTrailing(handlePosition, 300, undefined);

  useEffect(() => {
    document.addEventListener("mousemove", throttle, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousemove", throttle);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handlePosition();
    }, delay);
  }, [el]);

  return elementPosition;
};

export default useElementPosition;
