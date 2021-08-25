import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
  useUpdateCursor,
  useToggleMenu,
  useLockCursor,
} from "../context/GlobalContext";
import useElementPosition from "../hooks/useElementPosition";

const Header: React.FC = () => {
  const dispatch = useGlobalDispatchContext();
  const { currentTheme, menuOpen }: any = useGlobalStateContext();
  const onCursor = useUpdateCursor();
  const toggleMenu = useToggleMenu();
  const lockCursor = useLockCursor();
  const hamburger = useRef<HTMLDivElement>(null);
  const hamburgerPos = useElementPosition(hamburger, 1000);
  const themeToggle = useRef<HTMLDivElement>(null);
  const logoPos = useElementPosition(themeToggle, 1000);

  // Handle theme toggle on click
  const toggleTheme = () => {
    currentTheme === "dark"
      ? dispatch({ type: "TOGGLE_THEME", theme: "light" })
      : dispatch({ type: "TOGGLE_THEME", theme: "dark" });
  };

  // Get initial theme from local storage
  const initialTheme = useRef<string>();
  useEffect(() => {
    initialTheme.current = (
      localStorage.theme === null || undefined ? "dark" : localStorage.theme
    )!;
    dispatch({ type: "TOGGLE_THEME", theme: initialTheme.current });
  }, []);

  // Set theme on toggle
  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme);
    const elem = document.documentElement.style;
    if (currentTheme === "dark") {
      elem.setProperty("--color-primary", "black");
      elem.setProperty("--color-secondary", "white");
    } else if (currentTheme === "light") {
      elem.setProperty("--color-primary", "white");
      elem.setProperty("--color-secondary", "black");
    }
  }, [currentTheme]);

  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 0 }}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
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
