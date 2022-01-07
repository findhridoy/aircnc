import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
