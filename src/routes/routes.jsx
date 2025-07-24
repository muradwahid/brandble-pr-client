import { createBrowserRouter } from "react-router";
import Profile from "../components/user/Pages/Profile/Profile";
import UserLayout from "../layout/UserLayout";
import DashboardPage from "../components/user/Pages/DashboardPage/DashboardPage";

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
        path: "profile", // This will render at /user
        element: <Profile />,
      },
      {
        path: "dashboard", // This will render at /dashboard
        element: <DashboardPage />,
      },
    ],
  },
]);
