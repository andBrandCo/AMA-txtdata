import SignIn from "./Login";
import { connect } from "react-redux";
import { setTokenRequest } from "../../../redux/actions/authActions";

const mapStateToProps = state => ({
  name: state.name,
  token: state.token
});

const mapDispatchToProps = {
  login: setTokenRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
