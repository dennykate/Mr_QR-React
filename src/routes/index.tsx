import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import path from "./path";
import { AuthLayout, Loading } from "../components";

const Create = lazy(() => import("../pages/Create"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const View = lazy(() => import("../pages/View"));
const Auth = lazy(() => import("../pages/Auth"));

export default createBrowserRouter([
  {
    path: path.Create,
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayout>
          <Create />
        </AuthLayout>
      </Suspense>
    ),
  },
  {
    path: path.View,
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayout>
          <View />
        </AuthLayout>
      </Suspense>
    ),
  },
  {
    path: path.Dashboard,
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayout>
          <Dashboard />
        </AuthLayout>
      </Suspense>
    ),
  },
  {
    path: path.Auth,
    element: (
      <Suspense fallback={<Loading />}>
        <Auth />
      </Suspense>
    ),
  },
]);
