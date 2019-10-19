import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./style";

class InputAutoResponse extends Component {
  render() {
    const { classes, handleChange, text, id, placeholder } = this.props;
    return (
      <TextField
        id={id}
        // label="end auto Response"
        // disableUnderline
        // InputProps={{ disableUnderline: true }}
        className={classes.textField}
        value={text || ""}
        onChange={handleChange}
        placeholder={placeholder}
        margin="dense"
        multiline
        rowsMax="4"
        variant="outlined"
      />
    );
  }
}

export default withStyles(styles)(InputAutoResponse);
