import React, { useEffect, useState, useRef } from "react";
import { useGlobalStateContext } from "../context/GlobalContext";
import { motion } from "framer-motion";

interface iState {
  x: number;
  y: number;
}

const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<iState>({
    x: -200,
    y: -200,
  });

  const onMouseMove = (e: MouseEvent): void => {
    const { clientX: x, clientY: y } = e;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const { cursorType, cursorLocked, cursorPosition }: any =
    useGlobalStateContext();
  const cursorWidth = useRef<any>(null);

  return (
    <motion.div
      ref={cursorWidth}
      className={`cursor ${!!cursorType && "hovered"} ${cursorType}`}
      style={{
        x: cursorLocked
          ? cursorPosition.x - cursorWidth.current?.offsetWidth / 2
          : mousePosition.x - cursorWidth.current?.offsetWidth / 2,
        y: cursorLocked
          ? cursorPosition.y - cursorWidth.current?.offsetWidth / 2
          : mousePosition.y - cursorWidth.current?.offsetWidth / 2,
      }}
    ></motion.div>
  );
};

export default Cursor;
