import React, { Fragment } from "react";
import TableMessages from "../../TableMessages";
import InputKeyword from "../../InputKeyword";

const KeywordsWrapper = () => {
  return (
    <Fragment>
      <InputKeyword />
      <TableMessages />
    </Fragment>
  );
};

export default KeywordsWrapper;
