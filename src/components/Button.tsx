import { createStyles } from "@mantine/core";
import { ButtonProps } from "../types";

const useStyles = createStyles((theme) => ({
  button: {
    position: "relative",
    padding: "10px ",
    fontSize: theme.fontSizes.md,
    fontWeight: "bold",
    borderRadius: 100,
    background: "white",
    color: theme.white,
    transition: "all 0.2s ease-in-out",
    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
    border: `1px solid gray`,

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 8px rgba(0, 0, 0, 0.2)`,
    },

    "&:active": {
      transform: "translateY(0)",
      boxShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
    },
  },
}));

const Button = ({ children }: ButtonProps) => {
  const { classes } = useStyles();

  return <button className={classes.button}>{children}</button>;
};

export default Button;
