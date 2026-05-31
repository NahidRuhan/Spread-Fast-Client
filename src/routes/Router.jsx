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
import Payment from "../pages/dashboard/payment/Payment";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/payment/PaymentCancelled";
import PaymentHistory from "../pages/dashboard/payment-history/PaymentHistory";
import RiderDashboard from "../pages/dashboard/rider/RiderDashboard";
import UserManage from "../pages/dashboard/user-management/UserManage";
import AdminRoute from "./AdminRoute";
import AllParcels from "../pages/dashboard/all-parcel/AllParcels";
import RiderRoute from "./RiderRoute";
import PendingParcel from "../pages/dashboard/pending-parcel/PendingParcel";
import Tracking from "../pages/dashboard/my-parcels/Tracking";
import ErrorPage from "../components/error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
          element: <PrivateRoute><Rider></Rider></PrivateRoute>,
          loader: () => fetch("/serviceCenters.json").then(res=>res.json())
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'tracking/:id',
        Component: Tracking
      }
    ]
  },
  {
    path: 'payment-history',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        Component: PaymentHistory
      },
    ]
  },
  {
    path: 'rider-dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <AdminRoute><RiderDashboard></RiderDashboard></AdminRoute>
      },
    ]
  },
  {
    path: 'manage-user',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <AdminRoute><UserManage></UserManage></AdminRoute>
      },
    ]
  },
  {
    path: 'all-parcels',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <AdminRoute><AllParcels></AllParcels></AdminRoute>
      },
    ]
  },
  {
    path: 'pending-parcels',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <RiderRoute><PendingParcel></PendingParcel></RiderRoute>
      },
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);