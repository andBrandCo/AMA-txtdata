import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputAutoResponse from "../InputAutoResponse";
import { useStyles } from "./style";
import InputURL from "../InputURL";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function TableMessages({ messages }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Keyword</TableCell>
            <TableCell>Auto Response</TableCell>
            <TableCell>URL Sent</TableCell>
            {/* <TableCell align="right">MobileNumber</TableCell>
            <TableCell align="left">AutoResponse</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map(({ _id, keyword, autoResponse, URLSent }, index) => (
            <TableRow key={_id}>
              <TableCell component="th" scope="row">
                {keyword}
              </TableCell>
              <TableCell align="left">
                <InputAutoResponse text={autoResponse} id={_id} />
              </TableCell>
              <TableCell align="left">
                <InputURL URLSent={URLSent} id={_id} />
              </TableCell>
              {/* <TableCell align="right">{row.URLSent}</TableCell> */}
              {/* <TableCell align="right">{row.MobileNumber}</TableCell>
              <TableCell align="left">{row.AutoResponse}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
