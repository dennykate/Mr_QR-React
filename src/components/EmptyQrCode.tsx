import { Button, createStyles } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  text: {
    fontSize: 23,
    fontWeight: 500,
    marginBottom: 10,
  },
}));

const EmptyQrCode = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <h6 className={classes.text}>There is no qr code!</h6>

      <Button onClick={() => navigate("/")} color="green">
        Create One
      </Button>
    </div>
  );
};

export default EmptyQrCode;
