import TableReport from "./TableReport";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/editDataActions";

const mapStateToProps = state => ({
  messages: state.messageList
});

const mapDispatchToProps = {
  deleteRow: actions.deleteRowRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableReport);
