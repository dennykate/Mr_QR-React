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
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <p>
        Developed by <Link to="">Denny Kate</Link> &{" "}
        <Link to="">Thwe Thwe</Link> © 2023 Mr.QR
      </p>
    </div>
  );
};

export default Footer;
