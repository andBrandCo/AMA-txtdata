import React, { useState, Fragment } from "react";
// import axios from "axios"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useStyles } from "./style";
import AuthService from "../../../services/api/AuthService";

const UpdatePassword = ({ userId, token }) => {
  // const UpdatePassword = ({ match: { params } }) => {
  //   console.log("params - ", params);

  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updatePassword = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPassword("");
      setConfirmError(true);
    } else {
      await AuthService.updatePassword({ password, userId, token });
      setSubmitted(true);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update your password
        </Typography>
        <br />
        {submitted ? (
          <Fragment>
            <p>Your password has been saved.</p>
            <Link to="/login">Sign back in</Link>
          </Fragment>
        ) : (
          <Fragment>
            <form className={classes.form} onSubmit={updatePassword}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="password"
                type="password"
                name="password"
                autoComplete="password"
                className={classes.input}
                autoFocus
                onChange={event => setPassword(event.target.value)}
              />
              <TextField
                error={confirmError}
                helperText={confirmError ? "incorrect password" : null}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                className={classes.input}
                type="password"
                id="confirmPassword"
                label="confirm Password"
                name="confirmPassword"
                autoComplete="password"
                // autoFocus
                onChange={event => setConfirmPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update password
              </Button>
            </form>
          </Fragment>
        )}
      </div>
    </Container>
  );
};

export default UpdatePassword;
