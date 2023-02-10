import { router } from "../../lib/reactRouterDom";
import { RouterProvider } from "react-router-dom";

function MyRouterProvider() {
  return <RouterProvider router={router} />;
}

export default MyRouterProvider;
