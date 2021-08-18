import React, { createContext, useReducer, useContext } from "react";

interface action {
  type: string;
  theme: string;
}
interface state {
  currentTheme: string;
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
    default: {
      throw new Error(`unhandled action type: ${action.type}`);
    }
  }
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentTheme: "dark",
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
