import SignIn from "./Login";
import { connect } from "react-redux";
import { actions } from "../../../redux/actions/authActions";

const mapStateToProps = state => ({
  name: state.name,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(actions.setTokenRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
