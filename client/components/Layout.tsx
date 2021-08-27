import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Cursor from "./Cursor";
import Header from "./Header";
import Navigation from "./Navigation";

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const { width }: any = useWindowDimensions();
  return (
    <>
      {width >= 800 && <Cursor />}
      <Header />
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
