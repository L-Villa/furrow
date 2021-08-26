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
  const lockCursor = (pos: IProps["pos"], styles?: IProps["styles"]): void => {
    if (!cursorLocked) {
      dispatch({ type: "SET_CURSOR_LOCKED", cursorLocked: true });
      dispatch({ type: "SET_CURSOR_POSITION", cursorPosition: pos });
      onCursor(styles?.enter);
    } else {
      dispatch({ type: "SET_CURSOR_LOCKED", cursorLocked: false });
      onCursor(styles?.exit);
    }
  };
  return lockCursor;
};
