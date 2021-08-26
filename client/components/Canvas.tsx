import React, { useEffect, useRef } from "react";
import { useGlobalStateContext } from "../context/GlobalContext";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Canvas = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height }: any = useWindowDimensions();
  const { currentTheme }: any = useGlobalStateContext();

  useEffect(() => {
    let renderingElement = canvas.current;
    let drawingElement = renderingElement?.cloneNode();
    let renderingCtx = renderingElement?.getContext("2d");
    //@ts-ignore
    let drawingCtx = drawingElement?.getContext("2d");
    let lastX: number;
    let lastY: number;
    let moving: boolean = false;

    if (renderingCtx) {
      renderingCtx.globalCompositeOperation = "source-over";
      renderingCtx.fillStyle = currentTheme === "dark" ? "#000" : "#fff";
      renderingCtx.fillRect(0, 0, width, height);

      renderingElement?.addEventListener("mouseover", (e) => {
        moving = true;
        lastX = e.pageX - renderingElement?.offsetLeft!;
        lastY = e.pageY - renderingElement?.offsetTop!;
      });
      renderingElement?.addEventListener("mouseup", (e) => {
        moving = false;
        lastX = e.pageX - renderingElement?.offsetLeft!;
        lastY = e.pageY - renderingElement?.offsetTop!;
      });

      renderingElement?.addEventListener("mousemove", (e) => {
        if (moving && renderingCtx) {
          drawingCtx.globalCompositeOperation = "source-over";
          renderingCtx.globalCompositeOperation = "destination-out";
          let currentX = e.pageX - renderingElement?.offsetLeft!;
          let currentY = e.pageY - renderingElement?.offsetTop!;
          drawingCtx.lineJoin = "round";
          drawingCtx.moveTo(lastX, lastY);
          drawingCtx.lineTo(currentX, currentY);
          drawingCtx.closePath();
          drawingCtx.lineWidth = width * 0.06;
          drawingCtx.stroke();
          lastX = currentX;
          lastY = currentY;
          //@ts-ignore
          renderingCtx.drawImage(drawingElement, 0, 0);
        }
      });
    }
  }, [currentTheme, width, height]);
  return (
    <canvas key={currentTheme} ref={canvas} width={width} height={height} />
  );
};

export default Canvas;
