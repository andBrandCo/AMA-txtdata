import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./style";

class InputURL extends Component {
  render() {
    const { classes, mutableURL, handleChange } = this.props;
    return (
      <Fragment>
        <Typography component="div">
          <TextField
            id="first-field"
            className={classes.textField}
            value={mutableURL}
            placeholder="type new url"
            margin="dense"
            inputProps={{ "aria-label": "bare" }}
            multiline
            rowsMax="3"
            onChange={handleChange("mutableURL")}
          />
        </Typography>
      </Fragment>
    );
  }
}

export default withStyles(styles)(InputURL);
