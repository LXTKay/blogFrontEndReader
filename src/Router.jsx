import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Error from "./Error";
import InitialView from "./InitialView";
import BlogEntry from "./BlogEntry";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <InitialView/>
        },
        {
          path: "posts/:postId",
          element: <BlogEntry/>
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;