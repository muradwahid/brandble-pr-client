import { createBrowserRouter } from "react-router";
import DashboardPage from "../components/user/Pages/DashboardPage/DashboardPage";
import Favorite from "../components/user/Pages/Favorite/Favorite";
import MyMessages from "../components/user/Pages/MyMessages/MyMessages";
import Notification from "../components/user/Pages/Notification/Notification";
import OrderHistory from "../components/user/Pages/OrderHistory/OrderHistory";
import Profile from "../components/user/Pages/Profile/Profile";
import Publications from "../components/user/Pages/Publications/Publications";
import UserLayout from "../layout/UserLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true, // This will render at /dashboard
        element: <DashboardPage />,
      },
      {
        path: "/profile", // This will render at /user
        element: <Profile />,
      },
      {
        path: "/dashboard", // This will render at /dashboard
        element: <DashboardPage />,
      },
      {
        path: "/publications", // This will render at /publications
        element: <Publications />,
      },
      {
        path: "/messages", // This will render at /publications
        element: <MyMessages />,
      },
      {
        path: "/favorite", // This will render at /publications
        element: <Favorite />,
      },
      {
        path: "/notifications", // This will render at /publications
        element: <Notification />,
      },
      {
        path: "order-history", // This will render at //order-history
        element: <OrderHistory />,
      },
    ],
  },
]);

export default router;
