import { useEffect, useRef } from "react";
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/GlobalContext";

// Used to initialize theme in local storage and update css variables
export const useTheme = () => {
  const initialTheme = useRef<string>();
  const { currentTheme }: any = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  // Set theme from localStorage unless localStorage is empty. Defaults to dark theme
  useEffect(() => {
    initialTheme.current = (
      localStorage.theme === null || undefined ? "dark" : localStorage.theme
    )!;
    dispatch({ type: "TOGGLE_THEME", theme: initialTheme.current });
  }, []);
  // Updated css variables to reflect current theme
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
};

// Used to toggle global theme
export const useToggleTheme = () => {
  const { currentTheme }: any = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  return () => {
    currentTheme === "dark"
      ? dispatch({ type: "TOGGLE_THEME", theme: "light" })
      : dispatch({ type: "TOGGLE_THEME", theme: "dark" });
  };
};

// Used to update cursor style
export const useUpdateCursor = () => {
  const { cursorStyles }: any = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  return (cursorType?: string): void => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };
};

// Used to show or hide the navigation component
export const useToggleMenu = () => {
  const { menuOpen }: any = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  return (): void => {
    dispatch({ type: "TOGGLE_NAVIGATION", menuOpen: !menuOpen });
  };
};

// Interface for useLockCursor
interface IProps {
  pos: { x: number; y: number };
  styles?: {
    enter?: string | undefined;
    exit?: string | undefined;
  };
}

// Used to lock cursor position
export const useLockCursor = () => {
  const dispatch = useGlobalDispatchContext();
  const { cursorLocked }: any = useGlobalStateContext();
  const onCursor = useUpdateCursor();
  return (pos: IProps["pos"], styles?: IProps["styles"]): void => {
    if (!cursorLocked) {
      dispatch({ type: "SET_CURSOR_LOCKED", cursorLocked: true });
      dispatch({ type: "SET_CURSOR_POSITION", cursorPosition: pos });
      onCursor(styles?.enter);
    } else {
      dispatch({ type: "SET_CURSOR_LOCKED", cursorLocked: false });
      onCursor(styles?.exit);
    }
  };
};
