import { RefObject, useEffect, useState } from "react";
import { useViewportScroll } from "framer-motion";

const useElementPosition = (el: RefObject<HTMLElement>, delay: number = 0) => {
  const getElement = (x: number, y: number): { x: number; y: number } => {
    return {
      x: x,
      y: y,
    };
  };

  const { scrollYProgress } = useViewportScroll();

  const [elementPosition, setElementPosition] = useState<any>(getElement);

  const handlePosition = () => {
    if (el.current === null) return;
    let element = el.current;
    let x = element!.getBoundingClientRect().left + element!.offsetWidth / 2;
    let y = element!.getBoundingClientRect().top + element!.offsetHeight / 2;
    setElementPosition(getElement(x, y));
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handlePosition, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", handlePosition);
  //   };
  // }, []);

  const [hookedYPostion, setHookedYPosition] = useState(0);
  useEffect(() => {
    scrollYProgress.onChange((v) => setHookedYPosition(v));
  }, [scrollYProgress]);

  useEffect(() => {
    setTimeout(() => {
      handlePosition();
    }, delay);
  }, [el, hookedYPostion]);

  return elementPosition;
};

export default useElementPosition;
