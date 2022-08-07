import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
function Routers() {
  return (
    <Router basename="/">
      <Route exact path="/">
        <App />
      </Route>
    </Router>
  );
}

export default Routers;
