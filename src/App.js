import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from "react-router-dom";
import SubmitAvailability from "./screens/SubmitAvailability";
import ViewAvailability from "./screens/ViewAvailability";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/submit-availability" component={SubmitAvailability} />
        <Route path="/view-availability" component={ViewAvailability} />
        <Redirect exact from="/" to="/submit-availability" />
      </Switch>
    </Router>
  );
};

export default App;
