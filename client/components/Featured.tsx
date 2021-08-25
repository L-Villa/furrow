import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useUpdateCursor,
  useToggleMenu,
  useGlobalStateContext,
} from "../context/GlobalContext";
import AnimateWhenVisible from "../hooks/AnimateWhenVisible";

const Featured = () => {
  const onCursor = useUpdateCursor();
  const toggleMenu = useToggleMenu();
  const [hovered, setHovered] = useState(false);
  const { menuOpen }: any = useGlobalStateContext();
  return (
    <AnimateWhenVisible
      variants={{
        initial: {
          opacity: 0,
          y: 72,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.6, 0.05, -0.01, 0.9],
          },
        },
      }}
      options={{
        triggerOnce: true,
        rootMargin: "-300px",
      }}
    >
      <section className="home-featured-section">
        <div className="container">
          <Link href="/projects/not-humble">
            <a>
              <motion.div
                className="featured-content"
                onMouseEnter={() => onCursor("hovered")}
                onMouseLeave={() => onCursor()}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
              >
                <div className="flex space-between">
                  <h3>Featured Project</h3>
                  <motion.div
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.6, 0.05, -0.01, 0.9],
                    }}
                    className="meta"
                  >
                    <h4>PEI Seafood</h4>
                    <h4>2019</h4>
                  </motion.div>
                </div>
                <h2 className="featured-title">
                  Not <br /> Humble
                  <span className="arrow">
                    <motion.svg
                      animate={{ x: hovered ? 48 : 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.6, 0.05, -0.01, 0.9],
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 101 57"
                    >
                      <path
                        d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                        fill="#FFF"
                        fillRule="evenodd"
                      ></path>
                    </motion.svg>
                  </span>
                </h2>
              </motion.div>
              <div className="featured-video">
                <video
                  src="/video/featured-video.mp4"
                  loop
                  autoPlay
                  muted
                ></video>
              </div>
            </a>
          </Link>
        </div>
        <div className="container">
          <div className="featured-projects">
            <div className="flex flex-end">
              <button
                onClick={() => toggleMenu()}
                onMouseEnter={() => onCursor("pointer")}
                onMouseLeave={() => onCursor(menuOpen ? "nav-open" : "")}
              >
                <span>All Projects</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </AnimateWhenVisible>
  );
};

export default Featured;
