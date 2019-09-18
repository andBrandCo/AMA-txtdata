import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./style";

class InputAutoResponse extends Component {
  inputRef = null;

  state = {
    autoResponseText: this.props.text,
    focus: false
  };

  handleClick = event => {
    if (event.target === this.inputRef) {
      this.setState({ focus: true });
    } else {
      this.setState({ focus: false });
    }
  };

  componentDidMount() {
    window.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick);
  }

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

  handleResponseSave = ev => {
    // ev.stopPropagation();
    this.props.sendAutoResponse({
      _id: this.props.id,
      autoResponse: this.state.autoResponseText
    });
  };

  onFocus = e => {
    this.setState({ focus: true });
  };
  onBlur = () => this.setState({ focus: false });

  render() {
    const { classes } = this.props;
    const { focus, autoResponseText } = this.state;
    return (
      <div>
        <TextField
          id="standard-name"
          label="type new auto Response"
          // disableUnderline
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
          value={autoResponseText}
          onChange={this.handleChange("autoResponseText")}
          margin="normal"
          multiline
          rowsMax="4"
          inputRef={node => {
            this.inputRef = node;
          }}
        />
        {focus && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleResponseSave}
          >
            Save
          </Button>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(InputAutoResponse);
