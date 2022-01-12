import { Button, CircularProgress } from "@material-ui/core";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import googleIcon from "../Images/Icons/google.png";
import Layout from "../Layout/Layout";

const Login = ({ location, history, replace }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [loading2, setLoading2] = useState();

  const { login, goolgeSignIn } = useAuth();

  // Redirect
  let { from } = location.state || { from: { pathname: "/" } };

  // Submit user information
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      history.replace(from);
      setLoading(false);
    } catch (error) {
      cogoToast.error(error.message, {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading2(true);
      await goolgeSignIn();
      history.replace(from);
      setLoading2(false);
    } catch (error) {
      cogoToast.error(error.message, {
        position: "bottom-right",
      });
      setLoading2(false);
    }
  };
  return (
    <Layout>
      <section className="sl__section">
        <div className="container">
          <div className="sl__form">
            <h2 className="sl__title">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form__group">
                <label className="form__text" htmlFor="email">
                  Email
                </label>
                <input
                  className="form__control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                />
              </div>

              <div className="form__group">
                <label className="form__text" htmlFor="password">
                  Password
                </label>
                <input
                  className="form__control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                  required
                />
              </div>

              <div className="form__btn">
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? (
                    <CircularProgress color="secondary" size={28} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
            <span className="form__bottom--text">
              Don't have an account?{" "}
              <NavLink to="/signup" className="form__bottom--link">
                Sign up
              </NavLink>
            </span>
            <div className="sl__bottom--section">
              <div className="sl__or--text">or</div>
              <div className="google__button">
                <img src={googleIcon} alt="Google Icon" />
                <Button
                  variant="contained"
                  onClick={handleGoogleSignIn}
                  disabled={loading2}
                >
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
