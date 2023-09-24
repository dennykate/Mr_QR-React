import { createStyles } from "@mantine/core";

import { Footer } from ".";
import { LayoutProps } from "../types";


const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  children: {
    width: "100%",
  },
  footer: {
    width: "100%",
    minHeight: 50,
    height: 50,
  },
}));

const Layout = ({ children }: LayoutProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.children}>{children}</div>
      <div className={classes.footer}>
        <Footer />
      </div>
      
    </div>
  );
};

export default Layout;
