import Cookies from "js-cookie";
import { Button, Input, createStyles } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { IconLogout, IconSearch } from "@tabler/icons-react";
import Logo from "../assets/logo.jpg";

const useStyles = createStyles(() => ({
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
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
}));

const Navbar = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("is_verified");

    navigate("/");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Link to="/">
          <div className={classes.logoContainer}>
            <img src={Logo} alt="logo" className={classes.logo} />
          </div>
        </Link>

        <div className={classes.inputContainer}>
          {/* <Input
            placeholder="Search"
            mr={5}
            rightSection={
              <Button radius={0} className={classes.inputButton}>
                <IconSearch size={18} />
              </Button>
            }
          /> */}
          <Button onClick={() => toast.error("Unavailable")} size="sm" mr={5}>
            Get Mobile App
          </Button>
          <Button color="red" onClick={onLogoutHandler}>
            <IconLogout size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
