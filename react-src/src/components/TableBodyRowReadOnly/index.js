import TableBodyRowReadOnly from "./TableBodyRowReadOnly";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  messageList: state.messageList
});

export default connect(
  mapStateToProps,
  null
)(TableBodyRowReadOnly);
