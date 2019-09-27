import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
