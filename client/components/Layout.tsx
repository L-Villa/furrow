import React from "react";
import Cursor from "./Cursor";
import Header from "./Header";
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/GlobalContext";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useGlobalDispatchContext();
  const { cursorStyles }: any = useGlobalStateContext();

  const onCursor = (cursorType: string) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };
  return (
    <>
      <Cursor />
      <Header onCursor={onCursor} />
      {children}
    </>
  );
};

export default Layout;
