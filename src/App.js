import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Result from "./Pages/Result";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/result" component={Result} />
      </Switch>
    </>
  );
};

export default App;
