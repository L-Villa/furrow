import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/GlobalContext";

interface FuncProps {
  onCursor(arg?: string): void;
}

const Header: React.FC<FuncProps> = ({ onCursor }) => {
  const dispatch = useGlobalDispatchContext();
  const { currentTheme }: any = useGlobalStateContext();

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
          <div
            className="logo"
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={() => onCursor()}
          >
            <Link href="/">FURR</Link>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={() => onCursor()}
            ></span>
            <Link href="/">W</Link>
          </div>
          <div className="menu">
            <div className="button">
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
