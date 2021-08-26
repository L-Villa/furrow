import React, { createContext, useReducer, useContext } from "react";
import { data } from "../data/data";

interface IData {
  routes: {
    id: number;
    title: string;
    path: string;
    video: string;
  }[];
  accordian: {
    id: number;
    title: string;
    results: string[];
  }[];
  animation: {
    variants: {
      initial: {
        opacity: number;
        y: number;
      };
      animate: {
        opacity: number;
        y: number;
        transition: {
          duration: number;
          ease: number[];
        };
      };
    };
    ease: number[];
    options: {
      triggerOnce: boolean;
      rootMargin: string;
    };
  };
}

interface IAction {
  type: string;
  theme: string;
  cursorType: boolean;
  menuOpen: boolean;
  cursorLocked: boolean;
  cursorPosition: { x: number; y: number };
  data: IData;
}
interface IState {
  currentTheme: string;
  cursorType: boolean;
  cursorStyles: string[];
  menuOpen: boolean;
  cursorLocked: boolean;
  cursorPosition: { x: number; y: number };
  data: IData;
}
type IDispatch = React.Dispatch<any>;
const GlobalStateContext = createContext({});
const GlobalDispatchContext = createContext<IDispatch>({
  // @ts-ignore
  type: "TOGGLE_THEME",
  theme: "dark",
});

const globalReducer = (state: IState, action: IAction) => {
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
    case "SET_CURSOR_LOCKED": {
      return {
        ...state,
        cursorLocked: action.cursorLocked,
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
    cursorStyles: ["pointer", "hovered", "nav-open"],
    menuOpen: false,
    cursorLocked: false,
    cursorPosition: { x: 0, y: 0 },
    data: data,
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
