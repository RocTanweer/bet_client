import BusinessStateProvider from "./BusinessStateProvider.jsx";

function GlobalStateProvider({ children }) {
  return <BusinessStateProvider>{children}</BusinessStateProvider>;
}

export default GlobalStateProvider;
