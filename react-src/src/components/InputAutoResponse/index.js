import InputAutoResponse from "./InputAutoResponse";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/editDataActions";

const mapStateToProps = state => ({
  messageList: state.messageList
});

const mapDispatchToProps = {
  getAllMessageList: actions.getMessageListRequest,
  sendAutoResponse: actions.sendAutoResponseRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputAutoResponse);
