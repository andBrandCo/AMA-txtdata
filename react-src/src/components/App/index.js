import App from "./App";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/editDataActions";

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
  keyword: state.keyword,
  messageList: state.messageList
});

const mapDispatchToProps = {
  sendKeyword: actions.sendKeywordRequest,
  getAllMessageList: actions.getMessageListRequest,
  sendAutoResponse: actions.sendAutoResponseRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
