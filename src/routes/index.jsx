import { createBrowserRouter, Navigate } from "react-router";
import Checkout from "../components/user/Pages/Checkout/Checkout";
import DashboardPage from "../components/user/Pages/DashboardPage/DashboardPage";
import Favorite from "../components/user/Pages/Favorite/Favorite";
import MyArticles from "../components/user/Pages/MyArticles/MyArticles";
import MyMessages from "../components/user/Pages/MyMessages/MyMessages";
import OrderHistory from "../components/user/Pages/MyOrders/OrderHistory/OrderHistory";
import RunningOrder from "../components/user/Pages/MyOrders/RunningOrder/RunningOrder";
import Notification from "../components/user/Pages/Notification/Notification";
import Payment from "../components/user/Pages/Payment/Payment";
import Profile from "../components/user/Pages/Profile/Profile";
import Publications from "../components/user/Pages/Publications/Publications";
import UserLayout from "../layout/UserLayout";
import UserMyOrderLayout from "../layout/UserMyOrderLayout";
import RunningOrderLayout from "../layout/RunningOrderLayout";
import Order from "../components/user/Pages/MyOrders/RunningOrder/Order/Order";
import Details from "../components/user/Pages/MyOrders/RunningOrder/Order/Details/Details";
import OrderSubmitForm from "../components/user/Pages/Checkout/PublishForm/OrderSubmitForm";

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
        path: "/user/orders", // This will render at //orders
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
        path: "/user/articles", // This will render at //articles
        element: <MyArticles />,
      },
      {
        path: "/user/payments", // This will render at //payments
        element: <Payment />,
      },
      {
        path: "/user/checkout", // This will render at //checkout
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/user/orders/running/:id",
    element: <RunningOrderLayout />,
    children: [
      {
        index: true,
        element: <Order />,
      },
      {
        path: "/user/orders/running/:id/details",
        element: <Details />,
      },
    ],
  },
  {
    path: "/user/checkout/order-submit",
    element: <OrderSubmitForm />,
  },
]);

export default router;
