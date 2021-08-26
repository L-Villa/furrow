import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useGlobalStateContext,
  useToggleTheme,
  useUpdateCursor,
  useToggleMenu,
  useLockCursor,
} from "../context/GlobalContext";
import useElementPosition from "../hooks/useElementPosition";

const Header: React.FC = () => {
  const {
    menuOpen,
    data: {
      animation: { ease },
    },
  }: any = useGlobalStateContext();
  const toggleTheme = useToggleTheme();
  const onCursor = useUpdateCursor();
  const toggleMenu = useToggleMenu();
  const lockCursor = useLockCursor();
  const hamburger = useRef<HTMLDivElement>(null);
  const hamburgerPos = useElementPosition(hamburger, 1000);
  const themeToggle = useRef<HTMLDivElement>(null);
  const logoPos = useElementPosition(themeToggle, 1000);

  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 0 }}
      transition={{ duration: 1, ease: ease }}
    >
      <div className="container">
        <div className="flex space-between no-height">
          <div className="logo" onMouseEnter={() => onCursor("hovered")}>
            <Link href="/">FURR</Link>
            <span
              ref={themeToggle}
              onClick={toggleTheme}
              onMouseEnter={() => {
                lockCursor(logoPos, { enter: "pointer" });
              }}
              onMouseLeave={() => {
                lockCursor(logoPos, { exit: "hovered" });
              }}
            ></span>
            <Link href="/">W</Link>
          </div>
          <div className="menu">
            <div
              className="button"
              ref={hamburger}
              onClick={() => toggleMenu()}
              onMouseEnter={() =>
                lockCursor(hamburgerPos, { enter: "hovered" })
              }
              onMouseLeave={() =>
                lockCursor(hamburgerPos, {
                  exit: menuOpen ? "nav-open" : "hovered",
                })
              }
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
