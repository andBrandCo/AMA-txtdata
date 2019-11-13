import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolBar: {
    backgroundColor: "#0098DB"
  },
  // menuButton: {
  //   marginRight: theme.spacing(2)
  // },
  // title: {
  //   flexGrow: 1
  // },
  link: {
    color: "white",
    "&:hover": {
      color: "white"
    }
  }
}));
