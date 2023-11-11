import { createContext, useReducer, useMemo } from "react";

import {
  investmentRootReducer,
  investmentInitialState,
} from "@/state/stores/investmentStore.js";

export const InvestmentContext = createContext();

InvestmentContext.displayName = "InvestmentState";

function InvestmentProvider({ children }) {
  const [state, dispatch] = useReducer(
    investmentRootReducer,
    investmentInitialState
  );

  const memoizedValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <InvestmentContext.Provider value={memoizedValue}>
      {children}
    </InvestmentContext.Provider>
  );
}

export default InvestmentProvider;
