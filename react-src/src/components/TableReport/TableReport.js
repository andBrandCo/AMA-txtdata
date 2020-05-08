import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TablePagination from '@material-ui/core/TablePagination';

import { useStyles } from "./style";
import { getFormattedDate } from "../../utils";
import { TableFooter } from "@material-ui/core";

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
  const sendReportHandler = () => sendReport({days: 1, isPrimary:true });
  const sendSecondaryReportHandler = () => sendReport({days: 1, isPrimary:false });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ position: "relative" }}>
      <Paper className={classes.root}>
          <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">
                Date
              </TableCell>
              <TableCell align="center">Keyword</TableCell>
              <TableCell align="center">UUID</TableCell>
              <TableCell align="center">Mobile Number</TableCell>
              <TableCell align="center">URL Sent</TableCell>
              <TableCell align="center">Auto Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
            ? records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : records
          ).map(
              ({
                id,
                uid,
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
                    <Typography component="div">{uid}</Typography>
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
              <TableCell colSpan={4}  align="left">
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
              <TableCell colSpan={4}  align="right">
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
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={sendSecondaryReportHandler}
                >
                  Send Secondary Report
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
            <TablePagination
              align="center"
              alignItems="center"
              colSpan={12}
              rowsPerPageOptions={[50, 100, 250, { label: 'All', value: -1 }]}
              count={records.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              //ActionsComponent={TablePaginationActions}
            />

          </TableRow>
          </TableFooter>
        </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
