import InputURL from "./InputURL";
import { connect } from "react-redux";
import { actions } from "../../redux/actions/editDataActions";

const mapStateToProps = state => ({
  keyword: state.keyword
});

const mapDispatchToProps = {
  sendKeyword: actions.sendKeywordRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputURL);
