import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default PublicRoute;
