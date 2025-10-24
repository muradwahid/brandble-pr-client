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
// import Login from "../components/auth/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
  // {
  //   path: "/auth/login",
  //   element: <Login/>,
  // },
  // {
  //   path: "/register",
  //   element: <Login/>,
  // },
  {
    path: "/",
    errorElement: <div></div>,
    element:<PrivateRoute><UserLayout /></PrivateRoute> ,
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
        element:<PrivateRoute> <Profile /></PrivateRoute>,
      },
      {
        path: "/user/dashboard", // This will render at /dashboard
        element: <PrivateRoute><DashboardPage /></PrivateRoute>  ,
      },
      {
        path: "/user/publications", // This will render at /publications
        element: <PrivateRoute> <Publications /></PrivateRoute>,
      },
      {
        path: "/user/messages",
        element:<PrivateRoute><MyMessages /></PrivateRoute> ,
      },
      {
        path: "/user/favorite",
        element:<PrivateRoute><Favorite /></PrivateRoute> ,
      },
      {
        path: "/user/notifications", // This will render at /publications
        element:<PrivateRoute><Notification /></PrivateRoute> ,
      },
      {
        path: "/user/orders", // This will render at //orders
        element:<PrivateRoute><UserMyOrderLayout /></PrivateRoute> ,
        children: [
          {
            index: true,
            element: <Navigate to="/user/orders/running" replace />,
          },
          {
            path: "/user/orders/running",
            element:<PrivateRoute><RunningOrder /></PrivateRoute> ,
          },

          {
            path: "/user/orders/history",
            element:<PrivateRoute><OrderHistory /></PrivateRoute> ,
          },
        ],
      },
      {
        path: "/user/articles", // This will render at //articles
        element:<PrivateRoute><MyArticles /></PrivateRoute> ,
      },
      {
        path: "/user/payments", // This will render at //payments
        element:<PrivateRoute><Payment /></PrivateRoute> ,
      },
      {
        path: "/user/checkout", // This will render at //checkout
        element: <PrivateRoute><Checkout /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/user/orders/running/:id",
    element:<PrivateRoute><RunningOrderLayout /></PrivateRoute> ,
    children: [
      {
        index: true,
        element:<PrivateRoute><Order /></PrivateRoute> ,
      },
      {
        path: "/user/orders/running/:id/details",
        element:<PrivateRoute><Details /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/user/checkout/order-submit",
    element:<PrivateRoute><OrderSubmitForm /></PrivateRoute> ,
  },
  // {
  //   path: "/admin",
  //   errorElement: <div>Error</div>,
  //   element:<PrivateRoute><AdminLayout /></PrivateRoute> ,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="/dashboard" replace />,
  //     },
  //     {
  //       path: "/admin/dashboard",
  //       element:<PrivateRoute><Home /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/publications",
  //       element:<PrivateRoute><AdminPublication /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/publications/:id",
  //       element:<PrivateRoute><SinglePublication /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/publications/edit/:id",
  //       element:<PrivateRoute><EditPublication /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/publications/add-new-publication",
  //       element:<PrivateRoute><AddPublication /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/users",
  //       element:<PrivateRoute><UserManagement /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/users/:id",
  //       element:<PrivateRoute><SingleUser /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/orders",
  //       element:<PrivateRoute><TotalOrders /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/orders/:id",
  //       element:<PrivateRoute><SingleOrder /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/orders/:id/details",
  //       element:<PrivateRoute><OrderDetails /></PrivateRoute> ,
  //     },
  //     {
  //       path: "/admin/payments",
  //       element: <PrivateRoute><Payments /></PrivateRoute>,
  //     },
  //     {
  //       path: "/admin/messages",
  //       element:<PrivateRoute><Messages /></PrivateRoute> ,
  //     },
  //   ],
  // },
]);

export default router;
