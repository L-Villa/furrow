import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useGlobalStateContext,
  useUpdateCursor,
} from "../context/GlobalContext";
import Canvas from "./Canvas";

const Banner: React.FC = () => {
  const onCursor = useUpdateCursor();
  const {
    data: {
      animation: { ease },
    },
  }: any = useGlobalStateContext();

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
      <Canvas />
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
