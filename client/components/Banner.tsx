import React from "react";
import { motion } from "framer-motion";

const Banner: React.FC = () => {
  return (
    <section className="banner">
      <div className="video">
        <video
          src="/video/video.mp4"
          height="100%"
          width="100%"
          loop
          autoPlay
        ></video>
      </div>
      <canvas></canvas>
      <h1 className="banner-title">
        <span className="headline">DIG</span>
        <span className="headline">DEEP</span>
      </h1>
    </section>
  );
};

export default Banner;
