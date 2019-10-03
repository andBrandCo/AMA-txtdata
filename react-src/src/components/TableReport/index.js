import TableReport from "./TableReport";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/recordsActions";

const mapStateToProps = state => ({
  records: state.recordList
});

const mapDispatchToProps = {
  getRecords: actions.getAllRecordRequest,
  sendReport: actions.sendReportRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableReport);
