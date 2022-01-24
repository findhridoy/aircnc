import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const { userInfo, logout } = useAuth();

  let location = JSON.parse(sessionStorage.getItem("locationData"));

  const { id } = useParams();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      cogoToast.error("Somthing was wrong!", { position: "bottom-right" });
    }
  };
  const openNavMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const cleanup = window.addEventListener("scroll", function () {
      if (this.scrollY >= 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    });
    return () => cleanup;
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
            <li>{location?.locationName.slice(0, 12)}...</li>
            <li>
              <Moment format="MMM DD">{location?.checkIn}</Moment>-
              <Moment format="DD">{location?.checkOut}</Moment>
            </li>
            <li>{location?.guestCount} Guests</li>
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
                  <NavLink className="nav__link" exact to="/help">
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
                  onClick={handleLogout}
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
