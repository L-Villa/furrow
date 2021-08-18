import React from "react";
import Link from "next/link";
import { useGlobalStateContext } from "../context/GlobalContext";

export default function Header() {
  const { currentTheme }: any = useGlobalStateContext();
  return (
    <header>
      {console.log(currentTheme)}
      <div className="container">
        <div className="flex space-between no-height">
          <div className="logo">
            <Link href="/">FURR</Link>
            <span></span>
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
