import { Box } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "./context/GlobalStateProvider.jsx";

import { Header } from "./layouts";
import { Sidebar } from "./layouts";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = useGlobalState();

  const {
    businessDetails: { loginToken },
  } = state;

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <>
      {!loginToken && (
        <Navigate
          to={"/login"}
          replace={true}
          state={{ prevPath: location.pathname }}
        />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "auto", md: "256px auto" },
          gridTemplateRows: "64px auto",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Sidebar />

        <Outlet />
      </Box>
    </>
  );
}

export default App;
