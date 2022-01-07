import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Header({ params }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const { userInfo, logout } = useAuth();

  const { id } = useParams();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("res");
    } catch (error) {
      console.log(error);
    }
  };
  const openNavMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (this.scrollY >= 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    });
  }, []);
  return (
    <header className={showHeader ? "header show__header" : "header"}>
      <nav className="nav container">
        <div className="nav__logo">
          <NavLink exact to="/">
            <h1>Aircnc</h1>
          </NavLink>
        </div>
        {(window.location.pathname === "/result" ||
          window.location.pathname === `/details/${id}`) && (
          <div className="nav__search">
            <li>Dhaka</li>
            <li>
              <Moment format="MMM DD">{new Date()}</Moment>-
              <Moment format="DD">{new Date()}</Moment>
            </li>
            <li>3 Guests</li>
            <SearchIcon />
          </div>
        )}
        <div className={showMenu ? "nav__menu show__menu" : "nav__menu"}>
          <ul className="nav__list">
            {!(
              window.location.pathname === "/result" ||
              window.location.pathname === `/details/${id}`
            ) && (
              <>
                <li className="nav__item">
                  <NavLink className="nav__link" exact to="/hym">
                    <Button>Host your home</Button>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" exact to="/hue">
                    <Button>Host your experiance</Button>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" exact to="/confirm/rules">
                    <Button>Help</Button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {userInfo ? (
            <div className="nav__profile">
              {userInfo?.photoURL ? (
                <NavLink exact to="/profile">
                  <Avatar
                    alt={userInfo?.displayName}
                    src={userInfo?.photoURL}
                  />
                </NavLink>
              ) : (
                <NavLink exact to="/profile">
                  <Avatar alt={userInfo?.displayName} src="/" />
                </NavLink>
              )}

              <div className="logout__button">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="signup__button">
              <Button variant="contained">Login</Button>
            </NavLink>
          )}
        </div>

        <div className="hamburger__button">
          <IconButton onClick={openNavMenu}>
            {showMenu ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </nav>
    </header>
  );
}

export default Header;
