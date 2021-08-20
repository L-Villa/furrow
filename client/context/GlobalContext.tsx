import React, { createContext, useReducer, useContext } from "react";

interface action {
  type: string;
  theme: string;
  cursorType: boolean;
}
interface state {
  currentTheme: string;
  cursorType: boolean;
  cursorStyles: string[];
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
    default: {
      throw new Error(`unhandled action type: ${action.type}`);
    }
  }
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentTheme: "dark",
    cursorType: false,
    cursorStyles: ["pointer", "hovered"],
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

export const useUpdateCursor = () => {
  const { cursorStyles }: any = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const onCursor = (cursorType?: string) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };
  return onCursor;
};
