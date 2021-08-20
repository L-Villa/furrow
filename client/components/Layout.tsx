import React from "react";
import Cursor from "./Cursor";
import Header from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Cursor />
      <Header />
      {children}
    </>
  );
};

export default Layout;
