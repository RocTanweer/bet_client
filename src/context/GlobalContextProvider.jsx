import GlobalStateProvider from "./stateProvider/GlobalStateProvider.jsx";
import MyRouterProvider from "./routerProvider/MyRouterProvider.jsx";
import OAuthProvider from "./oAuthProvider/OAuthProvider.jsx";

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
