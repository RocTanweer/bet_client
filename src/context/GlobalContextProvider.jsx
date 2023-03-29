import GlobalStateProvider from "./GlobalStateProvider.jsx";
import MyRouterProvider from "./MyRouterProvider.jsx";
import OAuthProvider from "./OAuthProvider.jsx";

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
