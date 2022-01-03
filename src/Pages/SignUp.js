import { Button } from "@material-ui/core";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Layout from "../Layout/Layout";

const SignUp = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      cogoToast.warn("Password don't match!", { position: "bottom-right" });
    } else {
      cogoToast
        .loading("Loading....", { position: "bottom-right" })
        .then(async () => {
          try {
            await signup(email, password, name);
            cogoToast.success("Your account has been created.", {
              position: "bottom-right",
            });
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
    }
  };
  return (
    <Layout>
      <section className="sl__section">
        <div className="container">
          <div className="sl__form">
            <h2 className="sl__title">Sign up</h2>
            <form onSubmit={handleSubmit}>
              <div className="form__group">
                <label className="form__text" htmlFor="fullname">
                  Name
                </label>
                <input
                  className="form__control"
                  type="text"
                  name="fullname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your fullname..."
                  required
                />
              </div>

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

              <div className="form__group">
                <label className="form__text" htmlFor="confirmPassword">
                  Name
                </label>
                <input
                  className="form__control"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your confirm password..."
                  required
                />
              </div>
              <div className="form__btn">
                <Button type="submit">Sing up</Button>
              </div>
            </form>
            <span className="form__bottom--text">
              Already have an account?{" "}
              <NavLink to="/login" className="form__bottom--link">
                Login
              </NavLink>
            </span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;
