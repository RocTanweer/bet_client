import { BusinessStateContext } from "@/context/stateProvider/BusinessStateProvider";

import { useContext } from "react";

export function useBusinessState() {
  return useContext(BusinessStateContext);
}
