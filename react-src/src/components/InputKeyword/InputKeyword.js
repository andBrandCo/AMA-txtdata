import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./style";

class InputKeyword extends Component {
  state = {
    message: "",
    mobileNumber: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.keyword !== prevProps.keyword) {
      this.setState({
        message: ""
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick = () => {
    this.props.sendKeyword({
      keyword: this.state.message,
      mobileNumber: this.state.mobileNumber
    });
    this.setState({
      message: "",
      mobileNumber: ""
    });
  };

  render() {
    const { classes, keyword } = this.props;
    const { message, mobileNumber } = this.state;
    return (
      <Fragment>
        <Typography style={{ margin: "30px 50px 0 30%" }}>
          These are the fields for testing message sending.
        </Typography>
        <TextField
          id="input-keyword"
          label="type keyword"
          className={classes.textField}
          value={message}
          onChange={this.handleChange("message")}
          margin="normal"
        />
        <TextField
          id="mobileNumber"
          label="mobile Number"
          className={classes.textField1}
          value={mobileNumber}
          onChange={this.handleChange("mobileNumber")}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleClick}
        >
          Send
        </Button>
        {keyword.keyword ? (
          keyword.autoResponse ? (
            <Typography variant="h4" gutterBottom>
              AutoResponse for {keyword.keyword} : {keyword.autoResponse}
            </Typography>
          ) : null
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(InputKeyword);
