import GlobalStateProvider from "./stateProvider/GlobalStateProvider.jsx";
import MyRouterProvider from "./routerProvider/MyRouterProvider.jsx";
import OAuthProvider from "./oAuthProvider/OAuthProvider.jsx";
import InvestmentProvider from "./stateProvider/InvestmentStateProvider.jsx";

function GlobalContextProvider() {
  return (
    <GlobalStateProvider>
      <OAuthProvider>
        <InvestmentProvider>
          <MyRouterProvider />
        </InvestmentProvider>
      </OAuthProvider>
    </GlobalStateProvider>
  );
}

export default GlobalContextProvider;
