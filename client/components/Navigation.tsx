import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { route } from "next/dist/server/router";

const routes = [
  {
    id: 0,
    title: "not humble",
    path: "/not-humble",
    video: "featured-video.mp4",
  },
  {
    id: 1,
    title: "bleeping easy",
    path: "/bleeping-easy",
    video: "easy.mp4",
  },
  {
    id: 2,
    title: "make it zero",
    path: "/make-it-zero",
    video: "make-it-zero.mp4",
  },
  {
    id: 3,
    title: "it takes an island",
    path: "/it-takes-an-island",
    video: "it-takes-an-island.mp4",
  },
  {
    id: 4,
    title: "50 beaches",
    path: "/50-beaches",
    video: "50-beaches.mp4",
  },
];

const Navigation: React.FC = () => {
  const [revealVideo, setRevealVideo] = useState({
    show: false,
    video: "featured-video.mp4",
    key: 0,
  });
  return (
    <nav>
      <div className="container">
        <div className="nav-header">
          <div className="flex space-between no-height">
            <h2>Projects</h2>
            <div className="close-nav">
              <button>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <div className="nav-list">
          <ul>
            {routes.map(({ id, title, path, video }) => (
              <motion.li
                key={id}
                onHoverStart={() =>
                  setRevealVideo({
                    show: true,
                    video: video,
                    key: id,
                  })
                }
                onHoverEnd={() =>
                  setRevealVideo({
                    show: false,
                    video: video,
                    key: id,
                  })
                }
              >
                <Link href={`/projects${path}`}>
                  <motion.div
                    initial={{ x: -108 }}
                    whileHover={{
                      x: -40,
                      transition: {
                        duration: 0.4,
                        ease: [0.5, 0.05, -0.01, 0.9],
                      },
                    }}
                    className="link"
                  >
                    <span className="arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 101 57"
                      >
                        <path
                          d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                          fill="#FFF"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    {title}
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="nav-footer"></div>
        <div className="nav-videos">
          <motion.div
            animate={{ width: revealVideo.show ? 0 : "100%" }}
            className="reveal"
          ></motion.div>
          <div className="video">
            <AnimatePresence>
              <motion.video
                key={revealVideo.key}
                src={`/video/${revealVideo.video}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                loop
                autoPlay
                muted
              ></motion.video>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
