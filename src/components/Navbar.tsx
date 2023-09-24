import { Button, Input, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconLogout, IconSearch } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: 70,
    background: "white",
  },
  container: {
    maxWidth: 1024,
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 40,
    background: "red",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  inputButton: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    
  }
}));

const Navbar = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Link to="/">
          <div className={classes.logoContainer}></div>
        </Link>

        <div className={classes.inputContainer}>
          <Input
            placeholder="Search"
            mr={5}
            rightSection={
              <Button radius={0} className={classes.inputButton}>
                <IconSearch size={18} />
              </Button>
            }
          />
          <Button size="sm" mr={5}>
            Get Mobile App
          </Button>
          <button className={classes.button}>
            <IconLogout size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
