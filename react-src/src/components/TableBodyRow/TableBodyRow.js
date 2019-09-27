import React, { Component, Fragment } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

import InputAutoResponse from "../InputAutoResponse";
import InputURL from "../InputURL";
import { styles } from "./style";
import TableBodyRowReadOnly from "../TableBodyRowReadOnly";

class TableBodyRow extends Component {
  state = {
    autoResponseBeforeURL: this.props.textBeforeURL,
    autoResponseAfterURL: this.props.textAfterURL,
    mutableURL: this.props.URL,
    keyword: this.props.keyword
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickSave = ev => {
    ev.preventDefault();
    const {
      autoResponseBeforeURL,
      autoResponseAfterURL,
      mutableURL,
      keyword
    } = this.state;

    this.props.newRow
      ? this.props.createRow({
          keyword,
          autoResponseBeforeURL,
          autoResponseAfterURL,
          mutableURL
        })
      : this.props.updateRow({
          id: this.props.id,
          autoResponseBeforeURL,
          autoResponseAfterURL,
          mutableURL,
          keyword
        });
    this.props.onClickFn("");
  };

  render() {
    const {
      autoResponseAfterURL,
      autoResponseBeforeURL,
      mutableURL,
      keyword
    } = this.state;
    const {
      id,
      classes,
      textBeforeURL,
      textAfterURL,
      keyword: word,
      editable,
      onClickFn
    } = this.props;
    return (
      <TableRow key={id}>
        {!editable ? (
          <TableBodyRowReadOnly
            keyword={word}
            autoResponseBeforeURL={textBeforeURL}
            autoResponseAfterURL={textAfterURL}
            id={id}
            URL={mutableURL}
          />
        ) : (
          <Fragment>
            <TableCell
              component="th"
              scope="row"
              className={classes.keywordCell}
            >
              <TextField
                id="standard-bare"
                value={keyword || ""}
                placeholder="type new Keyword"
                margin="dense"
                inputProps={{ "aria-label": "bare" }}
                onChange={this.handleChange("keyword")}
                variant="outlined"
              />
            </TableCell>
            <TableCell align="left" className={classes.textField}>
              <InputAutoResponse
                text={autoResponseBeforeURL}
                id="start-response"
                placeholder="Response"
                handleChange={this.handleChange("autoResponseBeforeURL")}
              />
            </TableCell>
            <TableCell align="left" className={classes.URLField}>
              <InputURL
                mutableURL={mutableURL}
                handleChange={this.handleChange}
                id={id}
              />
            </TableCell>
            <TableCell align="left" className={classes.textField}>
              <InputAutoResponse
                text={autoResponseAfterURL}
                id="end-response"
                placeholder="Response"
                handleChange={this.handleChange("autoResponseAfterURL")}
              />
            </TableCell>
          </Fragment>
        )}
        <TableCell align="left">
          {!editable ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => onClickFn(id)}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleClickSave}
            >
              Save
            </Button>
          )}
        </TableCell>
        {/* <TableCell align="right">{row.URLSent}</TableCell> */}
        {/* <TableCell align="right">{row.MobileNumber}</TableCell>
              <TableCell align="left">{row.AutoResponse}</TableCell> */}
      </TableRow>
    );
  }
}

export default withStyles(styles)(TableBodyRow);
