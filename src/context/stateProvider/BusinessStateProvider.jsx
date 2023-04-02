import { createContext, useReducer, useMemo } from "react";

import {
  businessRootReducer,
  businessInitialState,
} from "@/state/stores/businessStore";

export const BusinessStateContext = createContext();

BusinessStateContext.displayName = "BusinessState";

function BusinessStateProvider({ children }) {
  const [state, dispatch] = useReducer(
    businessRootReducer,
    businessInitialState
  );

  const momoizedValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <BusinessStateContext.Provider value={momoizedValue}>
      {children}
    </BusinessStateContext.Provider>
  );
}

export default BusinessStateProvider;
