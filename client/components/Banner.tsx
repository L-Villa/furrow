import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
  useGlobalStateContext,
  useUpdateCursor,
} from "../context/GlobalContext";

const Banner: React.FC = () => {
  const onCursor = useUpdateCursor();
  let canvas = useRef<HTMLCanvasElement>(null);
  const { width, height }: any = useWindowDimensions();
  const {
    currentTheme,
    data: {
      animation: { ease },
    },
  }: any = useGlobalStateContext();

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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }, []);

  const bannerTitle = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const headline = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: ease,
      },
    },
  };

  return (
    <section
      className="banner"
      onMouseEnter={() => onCursor("hovered")}
      onMouseLeave={() => onCursor()}
    >
      {loading && <div className="cover"></div>}
      <div className="video">
        <video
          src="/video/video.mp4"
          height="100%"
          width="100%"
          loop
          autoPlay
          muted
        ></video>
      </div>
      <canvas key={currentTheme} ref={canvas} width={width} height={height} />
      <motion.h1
        className="banner-title"
        variants={bannerTitle}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="headline"
          variants={headline}
          initial="initial"
          animate="animate"
        >
          DIG
        </motion.span>
        <motion.span
          className="headline"
          variants={headline}
          initial="initial"
          animate="animate"
        >
          DEEP
        </motion.span>
      </motion.h1>
    </section>
  );
};

export default Banner;
