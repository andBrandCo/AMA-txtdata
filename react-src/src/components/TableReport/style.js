import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "50px",
    width: "95%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  margin: {
    margin: theme.spacing(1)
  }
  // tableCell: {
  //   width: "200px"
  // }
}));
