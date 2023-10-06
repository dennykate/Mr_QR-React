import { Navigate, useNavigate } from "react-router-dom";

import { AccessToken, AuthLayoutProps } from "../types";
import useAccessToken from "../hooks/useAccessToken";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { token, is_verified }: AccessToken = useAccessToken();

  console.log({ token, is_verified });

  if (!token) return <Navigate to="/auth" />;
  else if (!is_verified) return <Navigate to="/verify" />;
  else return children;
};

export default AuthLayout;
