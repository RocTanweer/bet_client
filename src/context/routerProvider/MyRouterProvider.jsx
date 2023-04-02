import { RouterProvider } from "react-router-dom";

import { router } from "./routerContext.jsx";

function MyRouterProvider() {
  return <RouterProvider router={router} />;
}

export default MyRouterProvider;
