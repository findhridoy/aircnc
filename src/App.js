import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Confirm from "./Pages/Confirm";
import Home from "./Pages/Home";
import HotelDetails from "./Pages/HotelDetails";
import Result from "./Pages/Result";
import store from "./Redux/store";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./Components/Login/PrivateRoute";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/result">
            <Result />
          </Route>
          <Route exact path="/details/:id">
            <HotelDetails />
          </Route>
          <PrivateRoute exact path="/confirm/:id">
            <Confirm />
          </PrivateRoute>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;