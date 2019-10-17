import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useStyles } from "./style";
import AuthService from "../../../services/api/AuthService";

const RecoverPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sendPasswordResetEmail = async e => {
    e.preventDefault();
    const response = await AuthService.recoverPassword({ email });
    console.log("Response - ", response);

    setEmail("");
    setSubmitted(true);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
        <br />
        {submitted ? (
          <Fragment>
            <p>
              If that account is in our system, we emailed you a link to reset
              your password.
            </p>
            <Link to="/login">Return to sign in</Link>
          </Fragment>
        ) : (
          <Fragment>
            <Typography component="p" variant="body2">
              Enter your email and we'll send you reset instructions.
            </Typography>
            <form
              className={classes.form}
              onSubmit={sendPasswordResetEmail}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={event => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send password reset email
              </Button>
            </form>
            <Link to="/login">I remember my password</Link>
          </Fragment>
        )}
      </div>
    </Container>
  );
};

export default RecoverPassword;
