import RecoverPassword from "./RecoverPassword";
import { connect } from "react-redux";
import { recoverPasswordRequest } from "../../../redux/actions/authActions";

const mapStateToProps = state => ({
  loading: state.common.recoverPasswordSpinner,
  submitted: state.common.recoverPasswordSuccess
});

const mapDispatchToProps = {
  RecoverPassword: recoverPasswordRequest
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoverPassword);
