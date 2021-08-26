import React from "react";
import Cursor from "./Cursor";
import Header from "./Header";
import Navigation from "./Navigation";

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
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
