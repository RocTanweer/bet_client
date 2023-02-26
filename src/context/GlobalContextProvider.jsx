import { GlobalStateProvider } from "./globalState";
import { MyRouterProvider } from "./reactRouterDom";
import { OAuthProvider } from "./googleOAuth";

function GlobalContextProvider() {
  return (
    <GlobalStateProvider>
      <OAuthProvider>
        <MyRouterProvider />
      </OAuthProvider>
    </GlobalStateProvider>
  );
}

export default GlobalContextProvider;
