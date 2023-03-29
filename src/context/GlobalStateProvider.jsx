import { createContext, useReducer, useMemo, useContext } from "react";

import { rootReducer, initialState } from "../state/store";

const GlobalStateContext = createContext();

GlobalStateContext.displayName = "GlobalState";

function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export default GlobalStateProvider;
