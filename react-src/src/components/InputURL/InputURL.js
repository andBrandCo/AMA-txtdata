import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./style";
import editDBDataService from "../../services/api/editDBDataService";

class InputURL extends Component {
  state = {
    firstField: this.props.URLSent.mutableURL[0],
    secondField: this.props.URLSent.mutableURL[1],
    thirdField: this.props.URLSent.mutableURL[2],
    id: this.props.id
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

  handleClickEditURL = ev => {
    ev.preventDefault();
    const { firstField, secondField, thirdField, id } = this.state;
    editDBDataService.updateURLSent({
      firstField,
      secondField,
      thirdField,
      _id: id
    });
  };

  render() {
    const { classes, URLSent } = this.props;
    const { firstField, secondField, thirdField, id } = this.state;
    return (
      <Fragment>
        <a href={URLSent.wholeURL}>URL link</a>
        <br />
        <span>
          {URLSent.immutableURL[0]}
          <input
            type="text"
            value={firstField}
            onChange={this.handleChange("firstField")}
          />
          {URLSent.immutableURL[1]}
          <input
            type="text"
            value={secondField}
            onChange={this.handleChange("secondField")}
          />
          {URLSent.immutableURL[2]}
          <input
            type="text"
            value={thirdField}
            onChange={this.handleChange("thirdField")}
          />
          {URLSent.immutableURL[3]}
          <input type="text" value={id} onChange={this.handleChange("id")} />
        </span>
        <button onClick={this.handleClickEditURL}>Save</button>
      </Fragment>
    );
  }
}

export default withStyles(styles)(InputURL);
