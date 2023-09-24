import { Navigate } from "react-router-dom";

import { AuthLayoutProps } from "../types";
import useAccessToken from "../hooks/useAccessToken";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const token = useAccessToken();
  console.log(token);

  if (!token) return <Navigate to="/auth" />;
  else return children;
};

export default AuthLayout;
