import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { useStyles } from "./style";
import { getFormattedDate } from "../../utils";
import { TableFooter } from "@material-ui/core";
// import RecordService from "../../services/api/RecordService";

export default function TableReport({
  getRecords,
  sendReport,
  records,
  downloadRecordsCSV
}) {
  useEffect(() => {
    getRecords();
  }, []);

  const classes = useStyles();
  const refreshRecordsClick = () => getRecords();
  const makeFile = async () => {
    downloadRecordsCSV();
  };
  const sendReportHandler = () => sendReport();

  return (
    <div style={{ position: "relative" }}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">
                Date
              </TableCell>
              <TableCell align="center">Keyword</TableCell>
              <TableCell align="center">Phone ID</TableCell>
              <TableCell align="center">Mobile Number</TableCell>
              <TableCell align="center">URL Sent</TableCell>
              <TableCell align="center">Auto Response</TableCell>
              {/* <TableCell align="right">MobileNumber</TableCell>
            <TableCell align="left">AutoResponse</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map(
              ({
                id,
                phoneID,
                keyword,
                mobileNumber,
                autoResponse,
                urlSent,
                createdAt
              }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row" align="center">
                    <Typography component="div">
                      {getFormattedDate(new Date(createdAt))}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="div">{keyword}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="div">{phoneID}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="div">{mobileNumber}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="div">{urlSent}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="div">{autoResponse}</Typography>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={refreshRecordsClick}
                >
                  Refresh
                </Button>
              </TableCell>
              <TableCell align="right" colSpan={5}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={makeFile}
                >
                  Download Report
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={sendReportHandler}
                >
                  Send Report
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </div>
  );
}
