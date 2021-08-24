import React, { createContext, useReducer, useContext } from "react";
import useElementPosition from "../hooks/useElementPosition";

interface action {
  type: string;
  theme: string;
  cursorType: boolean;
  menuOpen: boolean;
  cursorPosition: { x: number; y: number };
}
interface state {
  currentTheme: string;
  cursorType: boolean;
  cursorStyles: string[];
  menuOpen: boolean;
  cursorPosition: { x: number; y: number };
}
type iDispatch = React.Dispatch<any>;
const GlobalStateContext = createContext({});
const GlobalDispatchContext = createContext<iDispatch>({
  // @ts-ignore
  type: "TOGGLE_THEME",
  theme: "dark",
});

const globalReducer = (state: state, action: action) => {
  switch (action.type) {
    case "TOGGLE_THEME": {
      return {
        ...state,
        currentTheme: action.theme,
      };
    }
    case "CURSOR_TYPE": {
      return {
        ...state,
        cursorType: action.cursorType,
      };
    }
    case "TOGGLE_NAVIGATION": {
      return {
        ...state,
        menuOpen: action.menuOpen,
      };
    }
    case "SET_CURSOR_POSITION": {
      return {
        ...state,
        cursorPosition: action.cursorPosition,
      };
    }
    default: {
      throw new Error(`unhandled action type: ${action.type}`);
    }
  }
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentTheme: "dark",
    cursorType: false,
    cursorStyles: ["pointer", "hovered", "nav-open", "locked"],
    menuOpen: false,
    cursorPosition: { x: 0, y: 0 },
  });

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext);

// Used to update cursor style
export const useUpdateCursor = () => {
  const { cursorStyles }: any = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const onCursor = (cursorType?: string): void => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };
  return onCursor;
};

// Used to show or hide the navigation component
export const useToggleMenu = () => {
  const { menuOpen }: any = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const toggleMenu = (): void => {
    dispatch({ type: "TOGGLE_NAVIGATION", menuOpen: !menuOpen });
  };
  return toggleMenu;
};

// Used to lock cursor position
export const useLockCursor = () => {
  const dispatch = useGlobalDispatchContext();
  const lockCursor = ({ x, y }: { x: number; y: number }): void => {
    dispatch({ type: "SET_CURSOR_POSITION", cursorPosition: { x, y } });
  };
  return lockCursor;
};
