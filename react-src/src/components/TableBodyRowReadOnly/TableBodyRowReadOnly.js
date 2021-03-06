import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "@material-ui/core/Link";
import Switch from '@material-ui/core/Switch';


import { styles } from "./style";

class TableBodyRowReadOnly extends Component {
  render() {
    const {
      id,
      URL,
      classes,
      keyword,
      autoResponseBeforeURL,
      autoResponseAfterURL,
      isPrimaryReport
    } = this.props;

    return (
      <Fragment key={id}>
        <TableCell component="th" scope="row" align="center">
          <Typography component="div">{keyword}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography component="div">{autoResponseBeforeURL}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography component="div">
            {" "}
            <Link href={URL} className={classes.link}>
              {URL}
            </Link>
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography component="div">{autoResponseAfterURL}</Typography>
        </TableCell>
        <TableCell align="left">
            <Switch
            checked={isPrimaryReport}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          </TableCell>
      </Fragment>
    );
  }
}

export default withStyles(styles)(TableBodyRowReadOnly);
