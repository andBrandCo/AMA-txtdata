import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import io from "socket.io-client";

import TableUser from "../TableUser/TableUser";
import ModalUser from "../ModalUser/ModalUser";

import "./App.css";
import SignIn from "../pages/Login/Login";
import { Messages } from "./testData.Messages";
import TableMessages from "../TableMessages";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: 200
  }
});

class App extends Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || "";
    this.socket = io.connect(this.server);

    this.state = {
      users: [],
      messages: Messages,
      online: 0,
      message: ""
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchUsers();
    // this.fetchMessages();
    this.socket.on("visitor enters", data => this.setState({ online: data }));
    this.socket.on("visitor exits", data => this.setState({ online: data }));
    this.socket.on("add", data => this.handleUserAdded(data));
    this.socket.on("update", data => this.handleUserUpdated(data));
    this.socket.on("delete", data => this.handleUserDeleted(data));
  }

  // Fetch data from the back-end
  fetchUsers() {
    axios
      .get(`${this.server}/api/users/`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchMessages() {
    axios
      .get(`${this.server}/api/messages/`)
      .then(response => {
        this.setState({ messages: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].name = user.name;
        users[i].email = user.email;
        users[i].age = user.age;
        users[i].gender = user.gender;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => {
      return u._id !== user._id;
    });
    this.setState({ users: users });
  }

  handleChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  render() {
    const { isLogged, classes } = this.props;
    const { messages, message } = this.state;
    console.log("messages - ", messages);

    let online = this.state.online;
    let verb = online <= 1 ? "is" : "are"; // linking verb, if you'd prefer
    let noun = online <= 1 ? "person" : "people";

    return (
      <div>
        <div className="App">
          {/* <div className='App-header'> */}
          {!isLogged && <SignIn />}
          {/* </div> */}
        </div>

        {isLogged && (
          <Fragment>
            <TextField
              id="standard-name"
              label="type keyword"
              className={classes.textField}
              value={message}
              onChange={this.handleChange}
              margin="normal"
            />
            <div>
              <p>List</p>
              <TableMessages messages={messages} />
            </div>
            <Container>
              <ModalUser
                headerTitle="Add User"
                buttonTriggerTitle="Add New"
                buttonSubmitTitle="Add"
                buttonColor="green"
                onUserAdded={this.handleUserAdded}
                server={this.server}
                socket={this.socket}
              />
              <em id="online">{`${online} ${noun} ${verb} online.`}</em>
              <TableUser
                onUserUpdated={this.handleUserUpdated}
                onUserDeleted={this.handleUserDeleted}
                users={this.state.users}
                server={this.server}
                socket={this.socket}
              />
            </Container>
          </Fragment>
        )}
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(App);
