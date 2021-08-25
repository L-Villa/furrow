import React, { useRef } from "react";
import { useLockCursor } from "../context/GlobalContext";
import AnimateWhenVisible from "../hooks/AnimateWhenVisible";
import useElementPosition from "../hooks/useElementPosition";
import { Instagram, Facebook, Vimeo } from "../public/svg/social-icons";

const Footer = () => {
  const lockCursor = useLockCursor();
  const instagramRef = useRef(null);
  const instagramPosition = useElementPosition(instagramRef);
  const facebookRef = useRef(null);
  const facebookPosition = useElementPosition(facebookRef);
  const vimeoRef = useRef(null);
  const vimeoPosition = useElementPosition(vimeoRef);

  return (
    <AnimateWhenVisible
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
        },
      }}
      options={{
        triggerOnce: true,
        rootMargin: "-100px",
      }}
    >
      <footer className="footer-nav">
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
              <a
                ref={instagramRef}
                href="/"
                target="_blank"
                onMouseEnter={() =>
                  lockCursor(instagramPosition, { enter: "hovered" })
                }
                onMouseLeave={() => lockCursor(instagramPosition)}
              >
                <Instagram />
              </a>
              <a
                ref={facebookRef}
                href="/"
                target="_blank"
                onMouseEnter={() =>
                  lockCursor(facebookPosition, { enter: "hovered" })
                }
                onMouseLeave={() => lockCursor(facebookPosition)}
              >
                <Facebook />
              </a>
              <a
                ref={vimeoRef}
                href="/"
                target="_blank"
                onMouseEnter={() =>
                  lockCursor(vimeoPosition, { enter: "hovered" })
                }
                onMouseLeave={() => lockCursor(vimeoPosition)}
              >
                <Vimeo />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </AnimateWhenVisible>
  );
};

export default Footer;
