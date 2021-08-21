import React from "react";
import Cursor from "./Cursor";
import Header from "./Header";
import Navigation from "./Navigation";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Cursor />
      <Header />
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
