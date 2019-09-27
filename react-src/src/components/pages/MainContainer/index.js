import MainContainer from "./MainContainer";
import { connect } from "react-redux";
import { actions } from "../../../redux/actions/editDataActions";

const mapStateToProps = state => ({
  name: state.name,
  token: state.token,
  messageList: state.messageList
});

const mapDispatchToProps = {
  getAllMessageList: actions.getMessageListRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
