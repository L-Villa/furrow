import { RefObject, useEffect, useState } from "react";

const useElementPosition = (el: RefObject<HTMLElement>, delay: number = 0) => {
  const getElement = (x: number, y: number): { x: number; y: number } => {
    return {
      x: x,
      y: y,
    };
  };

  const [elementPosition, setElementPosition] = useState<any>(getElement);

  useEffect(() => {
    const handlePosition = () => {
      let element = el.current;
      let x =
        element!.getBoundingClientRect().left +
        document.documentElement.scrollLeft +
        element!.offsetWidth / 2;
      let y =
        element!.getBoundingClientRect().top +
        document.documentElement.scrollTop +
        element!.offsetHeight / 2;
      setElementPosition(getElement(x, y));
    };
    setTimeout(() => {
      handlePosition();
    }, delay);
  }, [el]);

  return elementPosition;
};

export default useElementPosition;
