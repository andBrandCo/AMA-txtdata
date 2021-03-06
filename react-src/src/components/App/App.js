import React, { Component } from "react";
// import { Container } from "semantic-ui-react";
// import TableUser from "../TableUser/TableUser";
// import ModalUser from "../ModalUser/ModalUser";

// import axios from "axios";
// import io from "socket.io-client";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import SignIn from "../pages/Login";
import MainContainer from "../pages/MainContainer";
import history from "../../services/history";
import PrivateRoute from "../PrivateRoute";
import RecoverPassword from "../pages/RecoverPassword";
import UpdatePassword from "../pages/UpdatePassword";

class App extends Component {
  // constructor() {
  //   super();

  //   this.server = process.env.REACT_APP_API_URL || "";
  //   this.socket = io.connect(this.server);

  //   this.state = {
  //     users: [],
  //     online: 0
  //   };

  //   this.fetchUsers = this.fetchUsers.bind(this);
  //   this.handleUserAdded = this.handleUserAdded.bind(this);
  //   this.handleUserUpdated = this.handleUserUpdated.bind(this);
  //   this.handleUserDeleted = this.handleUserDeleted.bind(this);
  // }

  // Place socket.io code inside here

  // componentDidMount() {
  //   this.fetchUsers();
  //   this.fetchMessages();
  //   this.socket.on("visitor enters", data => this.setState({ online: data }));
  //   this.socket.on("visitor exits", data => this.setState({ online: data }));
  //   this.socket.on("add", data => this.handleUserAdded(data));
  //   this.socket.on("update", data => this.handleUserUpdated(data));
  //   this.socket.on("delete", data => this.handleUserDeleted(data));
  //   this.props.getAllMessageList();
  // }

  // Fetch data from the back-end
  // fetchUsers() {
  //   axios
  //     .get(`${this.server}/api/users/`)
  //     .then(response => {
  //       this.setState({ users: response.data });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // fetchMessages() {
  //   axios
  //     .get(`${this.server}/api/messages/`)
  //     .then(response => {
  //       this.setState({ messages: response.data });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // handleUserAdded(user) {
  //   let users = this.state.users.slice();
  //   users.push(user);
  //   this.setState({ users: users });
  // }

  // handleUserUpdated(user) {
  //   let users = this.state.users.slice();
  //   for (let i = 0, n = users.length; i < n; i++) {
  //     if (users[i]._id === user._id) {
  //       users[i].name = user.name;
  //       users[i].email = user.email;
  //       users[i].age = user.age;
  //       users[i].gender = user.gender;
  //       break; // Stop this loop, we found it!
  //     }
  //   }
  //   this.setState({ users: users });
  // }

  // handleUserDeleted(user) {
  //   let users = this.state.users.slice();
  //   users = users.filter(u => {
  //     return u._id !== user._id;
  //   });
  //   this.setState({ users: users });
  // }

  render() {
    const { isLogged } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isLogged ? (
                <Redirect to="/messages/keywords" />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/login" component={SignIn} />
          <Route path="/recover-password" component={RecoverPassword} />
          <Route
            path="/update-password/:userId/:token"
            render={({ match }) => (
              <UpdatePassword
                userId={match.params.userId}
                token={match.params.token}
              />
            )}
          />
          <PrivateRoute path="/messages" component={MainContainer} />
        </Switch>
      </Router>
    );

    // return (
    //   <div>
    //     <div className="App">
    //       {!isLogged && <SignIn />}
    //     </div>

    //     {isLogged && (
    //       <Fragment>
    //         <MainContainer />
    //         {/* <Container>
    //           <ModalUser
    //             headerTitle="Add User"
    //             buttonTriggerTitle="Add New"
    //             buttonSubmitTitle="Add"
    //             buttonColor="green"
    //             onUserAdded={this.handleUserAdded}
    //             server={this.server}
    //             socket={this.socket}
    //           />
    //           <em id="online">{`${online} ${noun} ${verb} online.`}</em>
    //           <TableUser
    //             onUserUpdated={this.handleUserUpdated}
    //             onUserDeleted={this.handleUserDeleted}
    //             users={this.state.users}
    //             server={this.server}
    //             socket={this.socket}
    //           />
    //         </Container> */}
    //       </Fragment>
    //     )}
    //   </div>
    // );
  }
}

export default App;
