import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Hobby from "../pages/Hobby";
import Profile from "../pages/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "hobby/:id",
        element: <Hobby />,
      },
      {
        path: "profile/:pk",
        element: <Profile />,
      },
    ],
  },
]);
