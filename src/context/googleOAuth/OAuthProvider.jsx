import { GoogleOAuthProvider } from "@react-oauth/google";

function OAuthProvider({ children }) {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}

export default OAuthProvider;
