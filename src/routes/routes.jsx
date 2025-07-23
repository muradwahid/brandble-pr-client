import { createBrowserRouter } from "react-router";
import UserLayout from "../layout/UserLayout";
import Profile from "../components/user/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true, // This will render at /dashboard
        element: <p>Dashboard Home</p>,
      },
      {
        path: "profile", // This will render at /dashboard/user
        element: <Profile/>,
      },
    ],
  },
]);
