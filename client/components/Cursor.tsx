import React, { useEffect, useState } from "react";
import { useGlobalStateContext } from "../context/GlobalContext";

interface iState {
  x: number;
  y: number;
}

const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<iState>({
    x: 400,
    y: 400,
  });

  const onMouseMove = (e: MouseEvent): void => {
    const { pageX: x, pageY: y } = e;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const { cursorType }: any = useGlobalStateContext();

  return (
    <div
      className={`cursor ${!!cursorType && "hovered"} ${cursorType}`}
      style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
    ></div>
  );
};

export default Cursor;
