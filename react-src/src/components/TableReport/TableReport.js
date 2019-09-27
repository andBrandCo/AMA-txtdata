import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./style";
import TableBodyRow from "../TableBodyRow";

export default function TableReport({ messages }) {
  const classes = useStyles();

  return (
    <div style={{ position: "relative" }}>
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
              {/* <TableCell align="center"></TableCell> */}
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
                  editable={false}
                  // onClickFn={setSelectedID}
                />
              )
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
