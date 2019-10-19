import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./style";

export default function AppHeader({ logout, history }) {
  const classes = useStyles();
  const logoutHandler = () => logout({ history });
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#3e1c68" }}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Link to="/messages/keywords" className={classes.link}>
            <Button color="inherit">Keywords</Button>
          </Link>

          <Typography variant="h6" className={classes.title}>
            <Link to="/messages/report" className={classes.link}>
              <Button color="inherit">Report</Button>
            </Link>
          </Typography>
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
