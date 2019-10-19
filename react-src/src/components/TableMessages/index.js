import TableMessages from "./TableMessages";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/editDataActions";

const mapStateToProps = state => ({
  messages: state.messageList
});

const mapDispatchToProps = {
  deleteRow: actions.deleteRowRequest,
  getAllMessageList: actions.getMessageListRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableMessages);
