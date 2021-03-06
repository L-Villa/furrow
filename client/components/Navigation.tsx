import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalStateContext } from "../context/GlobalContext";
import { useToggleMenu, useUpdateCursor } from "../hooks/useContextSetters";
import { Facebook, Instagram, Vimeo } from "../public/svg/social-icons";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface IRoutes {
  id: number;
  title: string;
  path: string;
  video: string;
}

const Navigation: React.FC = () => {
  const { width }: any = useWindowDimensions();
  const {
    menuOpen,
    data: {
      routes,
      animation: { ease },
    },
  }: any = useGlobalStateContext();
  const onCursor = useUpdateCursor();
  const toggleMenu = useToggleMenu();
  const [revealVideo, setRevealVideo] = useState({
    show: false,
    video: "featured-video.mp4",
    key: 0,
  });
  const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };
  const enableScroll = () => {
    window.onscroll = () => {};
  };
  useEffect(() => {
    if (menuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [menuOpen]);
  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: ease }}
            onHoverStart={() => onCursor("nav-open")}
            onHoverEnd={() => onCursor()}
          >
            <div className="container">
              <div className="nav-header">
                <div className="flex space-between no-height">
                  <h2>Projects</h2>
                  <div className="close-nav">
                    <button
                      onClick={() => toggleMenu()}
                      onMouseEnter={() => onCursor("pointer")}
                      onMouseLeave={() => onCursor("nav-open")}
                    >
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="nav-list">
                <ul>
                  {routes.map(({ id, title, path, video }: IRoutes) => (
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
                      onMouseEnter={() => onCursor("pointer")}
                      onMouseLeave={() => onCursor("nav-open")}
                    >
                      <Link href={`/projects${path}`}>
                        <motion.div
                          initial={{ x: -108 }}
                          whileHover={{
                            x: -40,
                            transition: {
                              duration: 0.4,
                              ease: ease,
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
              <footer className="nav-footer">
                <div className="container">
                  <div className="flex space-between">
                    <div className="footer-content">
                      <p>123.555.4321</p>
                      <p>info@contact.com</p>
                    </div>
                    <div className="footer-content wider">
                      <p>15 Main St</p>
                      <p>City, State 99999</p>
                    </div>
                    <div className="footer-social">
                      <Link href="/">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => onCursor("pointer")}
                          onMouseLeave={() => onCursor("nav-open")}
                        >
                          <Instagram />
                        </a>
                      </Link>
                      <Link href="/">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => onCursor("pointer")}
                          onMouseLeave={() => onCursor("nav-open")}
                        >
                          <Facebook />
                        </a>
                      </Link>
                      <Link href="/">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => onCursor("pointer")}
                          onMouseLeave={() => onCursor("nav-open")}
                        >
                          <Vimeo />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            {width >= 1024 && (
              <div className="nav-videos">
                <motion.div
                  animate={{ width: revealVideo.show ? 0 : "100%" }}
                  className="reveal"
                ></motion.div>
                <div className="video">
                  <AnimatePresence exitBeforeEnter>
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
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
