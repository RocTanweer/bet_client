import { GlobalStateProvider } from "./globalState";
import { MyRouterProvider } from "./reactRouterDom";

function GlobalContextProvider() {
  return (
    <GlobalStateProvider>
      <MyRouterProvider />
    </GlobalStateProvider>
  );
}

export default GlobalContextProvider;
