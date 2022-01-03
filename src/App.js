import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Context/AuthContext";
import ConfirmAndPay from "./Pages/ConfirmAndPay";
import Home from "./Pages/Home";
import HotelDetails from "./Pages/HotelDetails";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import Result from "./Pages/Result";
import ReviewHouseRules from "./Pages/ReviewHouseRules";
import SignUp from "./Pages/SignUp";
import WhosComming from "./Pages/WhosComming";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/result" component={Result} />
        <Route exact path="/details/:id" component={HotelDetails} />
        <Route exact path="/confirm/rules" component={ReviewHouseRules} />
        <Route exact path="/confirm/who'sComming" component={WhosComming} />
        <Route exact path="/confirm/confirm&pay" component={ConfirmAndPay} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="*" component={PageNotFound} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
