import { BusinessStateContext } from "@/context/stateProvider/BusinessStateProvider";
import { InvestmentContext } from "@/context/stateProvider/InvestmentStateProvider.jsx";

import { useContext } from "react";

export function useBusinessState() {
  return useContext(BusinessStateContext);
}

export function useInvestmentState() {
  return useContext(InvestmentContext);
}
