import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TablePaginationActions from "../TablePagination/TablePagination";

import { useStyles } from "./style";
import TableBodyRow from "../TableBodyRow";

export default function TableMessages({
  messages,
  getAllMessageList,
  deleteRow
}) {
  const classes = useStyles();

  const [selectedID, setSelectedID] = useState("");
  const [newLocalRow, setNewLocalRow] = useState(false);

  useEffect(() => {
    getAllMessageList();
  }, []);

  const mutableURL = messages.length > 0 ? messages[0].URLSent.mutableURL : "";

  const add = () => setNewLocalRow(true);
  const removeRow = () => {
    deleteRow({ id: selectedID });
    setSelectedID("");
  };
  const removeLocalRow = () => {
    setNewLocalRow(false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, messages.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  

  return (
    <div style={{ position: "relative" }}>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        size="medium"
        onClick={selectedID ? removeRow : newLocalRow ? removeLocalRow : add}
      >
        {selectedID || newLocalRow ? <RemoveIcon /> : <AddIcon />}
      </Fab>
      <Paper className={classes.root}>
    
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">
                Keyword
              </TableCell>
              <TableCell align="center">Text before URL</TableCell>
              <TableCell align="center">URL Sent</TableCell>
              <TableCell align="center">Text after URL</TableCell>
              <TableCell align="center">Primary Report</TableCell>
              <TableCell align="center">Edit</TableCell>
            {/* <TableCell align="left">AutoResponse</TableCell>  */}
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
            ? messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : messages
          ).map(
              ({
                id,
                keyword,
                autoResponseBeforeURL,
                autoResponseAfterURL,
                URLSent: { mutableURL },
                isPrimaryReport
              }) => (
                <TableBodyRow
                  key={id}
                  id={id}
                  keyword={keyword}
                  textBeforeURL={autoResponseBeforeURL}
                  textAfterURL={autoResponseAfterURL}
                  URL={mutableURL}
                  isPrimaryReport={typeof isPrimaryReport !== 'undefined'?isPrimaryReport:true}
                  editable={selectedID === id}
                  onClickFn={setSelectedID}
                />
              )
            )}
            {newLocalRow && (
              <TableBodyRow
                id="LocalRow"
                keyword={""}
                textBeforeURL={""}
                textAfterURL={""}
                URL={mutableURL}
                isPrimaryReport={true}
                editable
                newRow
                onClickFn={setNewLocalRow}
              />
            )}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={12}
              rowsPerPageOptions={[50, 100, 250, { label: 'All', value: -1 }]}
              count={messages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />

          </TableRow>
        </TableFooter>
        </Table>
      </Paper>
    </div>
  );
}
