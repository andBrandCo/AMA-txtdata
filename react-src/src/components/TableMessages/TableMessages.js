import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
              <TableCell align="center"></TableCell>
              {/* <TableCell align="right">MobileNumber</TableCell>
            <TableCell align="left">AutoResponse</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map(
              ({
                id,
                keyword,
                autoResponseBeforeURL,
                autoResponseAfterURL,
                URLSent: { mutableURL }
              }) => (
                <TableBodyRow
                  key={id}
                  id={id}
                  keyword={keyword}
                  textBeforeURL={autoResponseBeforeURL}
                  textAfterURL={autoResponseAfterURL}
                  URL={mutableURL}
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
                editable
                newRow
                onClickFn={setNewLocalRow}
              />
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
