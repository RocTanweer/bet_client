import BusinessStateProvider from "./BusinessStateProvider.jsx";
import CashStateProvider from "./CashStateProvider.jsx";

function GlobalStateProvider({ children }) {
  return (
    <BusinessStateProvider>
      <CashStateProvider>{children}</CashStateProvider>
    </BusinessStateProvider>
  );
}

export default GlobalStateProvider;
