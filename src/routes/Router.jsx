import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/home/Home";
import Coverage from "../pages/coverage/coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Rider from "../pages/rider/rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/send-parcel/SendParcel";
import AboutUs from "../pages/about-us/about-us/AboutUs";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/dashboard/my-parcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
          index: true,
          Component: Home
        },
        {
          path: 'coverage',
          Component: Coverage,
          loader: () => fetch("/serviceCenters.json").then(res=>res.json())
        },
        {
          path: 'about-us',
          Component: AboutUs,
        },
        {
          path: 'rider',
          element: <PrivateRoute><Rider></Rider></PrivateRoute>
        },
        {
          path: 'send-parcel',
          element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
          loader: () => fetch("/serviceCenters.json").then(res=>res.json())
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index:true,
        Component: MyParcels
      }
    ]
  },
]);