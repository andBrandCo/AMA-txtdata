import App from "./App";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
