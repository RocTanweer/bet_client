import { createContext, useReducer, useMemo } from "react";
import { cashInitialState, cashRootReducer } from "@/state/stores/cashStore";

export const CashStateContext = createContext();

CashStateContext.displayName = "CashState";

function CashStateProvider({ children }) {
  const [state, dispatch] = useReducer(cashRootReducer, cashInitialState);

  const memoizedValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CashStateContext.Provider value={memoizedValue}>
      {children}
    </CashStateContext.Provider>
  );
}

export default CashStateProvider;
