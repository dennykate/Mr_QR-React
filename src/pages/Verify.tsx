import { Navigate } from "react-router-dom";
import { Layout, VerificationForm } from "../components";
import useAccessToken from "../hooks/useAccessToken";
import { AccessToken } from "../types";

const Verify = () => {
  const { token, is_verified }: AccessToken = useAccessToken();

  if (!token) return <Navigate to="/auth" />;
  if (is_verified) return <Navigate to="/" />;

  return (
    <Layout>
      <VerificationForm />
    </Layout>
  );
};

export default Verify;
