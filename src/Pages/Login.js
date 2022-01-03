import { Button } from "@material-ui/core";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Layout from "../Layout/Layout";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    cogoToast
      .loading("Loading....", { position: "bottom-right" })
      .then(async () => {
        try {
          await login(email, password);
          history.push("/");
        } catch (error) {
          if (error) {
            cogoToast.error(error.message, {
              position: "bottom-right",
            });
          }
          console.log(error);
        }
      });
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
                <Button type="submit">Login</Button>
              </div>
            </form>
            <span className="form__bottom--text">
              Don't have an account?{" "}
              <NavLink to="/signup" className="form__bottom--link">
                Sign up
              </NavLink>
            </span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
