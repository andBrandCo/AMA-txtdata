import TableBodyRow from "./TableBodyRow";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/editDataActions";

const mapStateToProps = state => ({
  messageList: state.messageList
});

const mapDispatchToProps = {
  updateRow: actions.updateRowRequest,
  createRow: actions.createRowRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBodyRow);
