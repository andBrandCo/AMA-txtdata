import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import AppHeader from "../../AppHeader";
import PrivateRoute from "../../PrivateRoute";
import KeywordsWrapper from "../KeywordsWrapper";
import TableReport from "../../TableReport";

const MainContainer = ({ getAllMessageList }) => {
  useEffect(() => {
    // getAllMessageList();
  });
  return (
    <div style={{ backgroundColor: "#E5E5E5", height: "100vh" }}>
      <AppHeader />
      <Switch>
        <PrivateRoute path="/messages/keywords" component={KeywordsWrapper} />
        <PrivateRoute path="/messages/report" component={TableReport} />
      </Switch>
    </div>
  );
};

export default MainContainer;
