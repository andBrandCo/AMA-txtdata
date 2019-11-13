import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  submitButton: {
    backgroundColor: "#06516f",
    "&:hover": {
      backgroundColor: "#043244"
    }
  },
  tableButton: {
    backgroundColor: "transparent",
    color: "#0098db",
    border: "2px solid #0098db",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#0098db",
      color: "#ffffff",
      border: "2px solid #0098db"
    }
  },
  inputStyes: {
    "& label.Mui-focused": {
      color: "#595959"
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& fieldset": {
        borderColor: "#595959"
      }
    }
  }
});
