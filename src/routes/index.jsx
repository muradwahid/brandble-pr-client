import { createBrowserRouter, Navigate } from "react-router";
import Checkout from "../components/user/Pages/Checkout/Checkout";
import DashboardPage from "../components/user/Pages/DashboardPage/DashboardPage";
import Favorite from "../components/user/Pages/Favorite/Favorite";
import MyArticles from "../components/user/Pages/MyArticles/MyArticles";
import MyMessages from "../components/user/Pages/MyMessages/MyMessages";
import OrderHistory from "../components/user/Pages/MyOrders/OrderHistory/OrderHistory";
import Notification from "../components/user/Pages/Notification/Notification";
import Payment from "../components/user/Pages/Payment/Payment";
import Profile from "../components/user/Pages/Profile/Profile";
import Publications from "../components/user/Pages/Publications/Publications";
import UserLayout from "../layout/UserLayout";
import UserMyOrderLayout from "../layout/UserMyOrderLayout";
import RunningOrder from "../components/user/Pages/MyOrders/RunningOrder/RunningOrder";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error</div>,
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/user/profile" replace />,
      },
      // {
      //   //index: true, // This will render at /dashboard
      //   element: <DashboardPage />,
      // },
      {
        path: "/user/profile", // This will render at /user
        element: <Profile />,
      },
      {
        path: "/user/dashboard", // This will render at /dashboard
        element: <DashboardPage />,
      },
      {
        path: "/user/publications", // This will render at /publications
        element: <Publications />,
      },
      {
        path: "/user/messages", // This will render at /publications
        element: <MyMessages />,
      },
      {
        path: "/user/favorite", // This will render at /publications
        element: <Favorite />,
      },
      {
        path: "/user/notifications", // This will render at /publications
        element: <Notification />,
      },
      {
        path: "/user/orders", // This will render at //order-history
        element: <UserMyOrderLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/user/orders/running" replace />,
          },
          {
            path: "/user/orders/running",
            element: <RunningOrder />,
          },
          {
            path: "/user/orders/history",
            element: <OrderHistory />,
          },
        ],
      },
      {
        path: "/user/orders/running",
        element: <p>Running</p>,
      },
      {
        path: "/user/articles", // This will render at //articles
        element: <MyArticles />,
      },
      {
        path: "/user/payments", // This will render at //articles
        element: <Payment />,
      },
      {
        path: "/user/checkout", // This will render at //articles
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
