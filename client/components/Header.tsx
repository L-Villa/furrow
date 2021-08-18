import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/GlobalContext";

export default function Header() {
  const dispatch = useGlobalDispatchContext();
  const { currentTheme }: any = useGlobalStateContext();

  // Handle theme toggle on click
  const toggleTheme = () => {
    currentTheme === "dark"
      ? dispatch({ type: "TOGGLE_THEME", theme: "light" })
      : dispatch({ type: "TOGGLE_THEME", theme: "dark" });
  };

  // Get initial theme from local storage
  const boom = useRef<string>();
  useEffect(() => {
    boom.current = (
      localStorage.theme === null || undefined ? "dark" : localStorage.theme
    )!;
    dispatch({ type: "TOGGLE_THEME", theme: boom.current });
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
    <header>
      <div className="container">
        <div className="flex space-between no-height">
          <div className="logo">
            <Link href="/">FURR</Link>
            <span onClick={toggleTheme}></span>
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
    </header>
  );
}
