import { createStyles } from "@mantine/core";
import { Footer, Navbar, QrCardContainer } from "../components";
import useQuery from "../hooks/useQuery";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "#F8F6F4",
    flex: 1,
  },
}));

const Dashboard = () => {
  const { classes } = useStyles();
  const { query } = useQuery();

  useEffect(() => {
    getQrData();
  }, []);

  const getQrData = async () => {
    const data = await query("/qr");

   
  };

  return (
    <div className={classes.wrapper}>
      <Navbar />
      <QrCardContainer />
      <Footer />
    </div>
  );
};

export default Dashboard;
