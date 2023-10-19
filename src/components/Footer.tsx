import { createStyles } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
  },
  text: {
    fontSize: 18,
    textAlign: "center",

    "@media (max-width: 500px)": {
      fontSize: 12,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <p className={classes.text}>
        Developed by <Link to="https://github.com/dennykate">Denny Kate</Link> &{" "}
        <Link to="https://github.com/eiThwe">Thwe Thwe</Link> © 2023 Mr.QR
      </p>
    </div>
  );
};

export default Footer;
