import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SubmitAvailability from "./screens/SubmitAvailability";

const App = () => {
  return (
    <Router>
      <Route path="/" component={SubmitAvailability} />
    </Router>
  );
};

export default App;
