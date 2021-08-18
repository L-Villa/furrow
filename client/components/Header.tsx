import React, { useEffect } from "react";
import Link from "next/link";
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/GlobalContext";

export default function Header() {
  const dispatch = useGlobalDispatchContext();
  const { currentTheme }: any = useGlobalStateContext();

  const toggleTheme = () => {
    currentTheme === "dark"
      ? dispatch({ type: "TOGGLE_THEME", theme: "light" })
      : dispatch({ type: "TOGGLE_THEME", theme: "dark" });
  };

  useEffect(() => {
    const elem = document.documentElement.style;
    if (currentTheme === "dark") {
      elem.setProperty("--color-primary", "black");
      elem.setProperty("--color-secondary", "white");
    } else {
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
