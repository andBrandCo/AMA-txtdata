import MainContainer from "./MainContainer";
import { connect } from "react-redux";
import { userLogoutRequest } from "../../../redux/actions/authActions";

const mapStateToProps = state => ({
  name: state.name,
  token: state.token,
  messageList: state.messageList
});

const mapDispatchToProps = {
  logout: userLogoutRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
