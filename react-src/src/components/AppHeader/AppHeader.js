import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import toolBarLogo from "../../assets/Logo.png";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./style";

export default function AppHeader({ logout, history }) {
  const classes = useStyles();
  const logoutHandler = () => logout({ history });
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.toolBar}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <div>
            <Link to="/messages/keywords" className={classes.link}>
              <Button color="inherit" style={{ fontWeight: "700" }}>
                Keywords
              </Button>
            </Link>
            <Link to="/messages/report" className={classes.link}>
              <Button color="inherit" style={{ fontWeight: "700" }}>
                Report
              </Button>
            </Link>
          </div>
          <img src={toolBarLogo} alt="Logo" />
          <Button
            color="inherit"
            onClick={logoutHandler}
            style={{ fontWeight: "700" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
