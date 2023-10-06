import { Navigate } from "react-router-dom";
import { createStyles } from "@mantine/core";
import Cookies from "js-cookie";

import { AuthForm, Layout } from "../components";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "#F8F6F4",
    minHeight: "90vh",
    overflow: "hidden",
    padding: "20px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Auth = () => {
  const { classes } = useStyles();
  const token = Cookies.get("token");

  if (token) return <Navigate to="/" />;
  else
    return (
      <Layout>
        <div className={classes.wrapper}>
          <AuthForm />
        </div>
      </Layout>
    );
};

export default Auth;
