import { createBrowserRouter, Navigate } from "react-router";
import Checkout from "../components/user/Pages/Checkout/Checkout";
import OrderSubmitForm from "../components/user/Pages/Checkout/PublishForm/OrderSubmitForm";
import DashboardPage from "../components/user/Pages/DashboardPage/DashboardPage";
import Favorite from "../components/user/Pages/Favorite/Favorite";
import MyArticles from "../components/user/Pages/MyArticles/MyArticles";
import MyMessages from "../components/user/Pages/MyMessages/MyMessages";
import OrderHistory from "../components/user/Pages/MyOrders/OrderHistory/OrderHistory";
import Details from "../components/user/Pages/MyOrders/RunningOrder/Order/Details/Details";
import Order from "../components/user/Pages/MyOrders/RunningOrder/Order/Order";
import RunningOrder from "../components/user/Pages/MyOrders/RunningOrder/RunningOrder";
import Notification from "../components/user/Pages/Notification/Notification";
import Payment from "../components/user/Pages/Payment/Payment";
import Profile from "../components/user/Pages/Profile/Profile";
import Publications from "../components/user/Pages/Publications/Publications";
import RunningOrderLayout from "../layout/RunningOrderLayout";
import UserLayout from "../layout/UserLayout";
import UserMyOrderLayout from "../layout/UserMyOrderLayout";
import AdminLayout from "../layout/AdminLayout";
import Home from "../components/admin/Pages/Home/Home";
import AdminPublication from "../components/admin/Pages/AdminPublication/AdminPublication";
import SinglePublication from "../components/admin/Pages/SinglePublication/SinglePublication";
import EditPublication from "../components/admin/Pages/EditPublication/EditPublication";
import AddPublication from "../components/admin/Pages/AddPublication/AddPublication";
import UserManagement from "../components/admin/Pages/UserManagement/UserManagement";
import SingleUser from "../components/admin/Pages/SingleUser/SingleUser";
import TotalOrders from "../components/admin/Pages/TotalOrders/TotalOrders";
import Messages from "../components/admin/Pages/Messages/Messages";
import Payments from "../components/admin/Pages/Payments/Payments";
import SingleOrder from "../components/admin/Pages/TotalOrders/SingleOrder";
import OrderDetails from "../components/admin/Pages/TotalOrders/OrderDetails";


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
  {
    path: "/admin",
    errorElement: <div>Error</div>,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/admin/dashboard",
        element: <Home />,
      },
      {
        path: "/admin/publications",
        element: <AdminPublication />,
      },
      {
        path: "/admin/publications/:id",
        element: <SinglePublication />,
      },
      {
        path: "/admin/publications/edit/:id",
        element: <EditPublication />,
      },
      {
        path: "/admin/publications/add-new-publication",
        element: <AddPublication />,
      },
      {
        path: "/admin/users",
        element: <UserManagement />,
      },
      {
        path: "/admin/users/:id",
        element: <SingleUser />,
      },
      {
        path: "/admin/orders",
        element: <TotalOrders />,
      },
      {
        path: "/admin/orders/:id",
        element: <SingleOrder />,
      },
      {
        path: "/admin/orders/:id/details",
        element: <OrderDetails />,
      },
      {
        path: "/admin/payments",
        element: <Payments />,
      },
      {
        path: "/admin/messages",
        element: <Messages />,
      },
    ],
  },
]);

export default router;
