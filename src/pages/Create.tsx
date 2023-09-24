import { Button, Flex, createStyles } from "@mantine/core";

import { Layout, QrBox } from "../components";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "#F8F6F4",
  },
  container: {
    minHeight: "90vh",
    overflow: "hidden",
    padding: "20px 0",
    position: "relative",
    maxWidth: 1024,
    margin: "0 auto",
  },
  button: {
    position: "absolute",
    top: 20,
    right: 20,
  },
}));

const Create = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <div className={classes.wrapper}>
        <Flex justify="center" align="center" className={classes.container}>
          <QrBox />

          <Link to="/dashboard">
            <Button className={classes.button}>Dashboard</Button>
          </Link>
        </Flex>
      </div>
    </Layout>
  );
};

export default Create;
