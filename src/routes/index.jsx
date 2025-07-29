import { createBrowserRouter } from "react-router";
import DashboardPage from "../components/user/Pages/DashboardPage/DashboardPage";
import Favorite from "../components/user/Pages/Favorite/Favorite";
import MyMessages from "../components/user/Pages/MyMessages/MyMessages";
import Notification from "../components/user/Pages/Notification/Notification";
import OrderHistory from "../components/user/Pages/OrderHistory/OrderHistory";
import Profile from "../components/user/Pages/Profile/Profile";
import Publications from "../components/user/Pages/Publications/Publications";
import UserLayout from "../layout/UserLayout";
import MyArticles from "../components/user/Pages/MyArticles/MyArticles";
import Payment from "../components/user/Pages/Payment/Payment";
import Checkout from "../components/user/Pages/Checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error</div>,
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
      {
        path: "articles", // This will render at //articles
        element: <MyArticles />,
      },
      {
        path: "payments", // This will render at //articles
        element: <Payment />,
      },
      {
        path: "checkout", // This will render at //articles
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
