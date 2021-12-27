import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import Moment from "react-moment";
import { NavLink, useHistory, useParams } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const handleRoute = () => {
    history.push("/login");
  };
  const userLogOut = () => {};
  const handleHomeRoute = () => {
    history.push("/");
  };

  const openNavMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header>
      <nav className="nav container">
        <div className="nav__logo" onClick={handleHomeRoute}>
          <h1>Aircnc</h1>
        </div>
        <div className="nav__search">
          <li>Dhaka</li>
          <li>
            <Moment format="MMM DD">{new Date()}</Moment>-
            <Moment format="DD">{new Date()}</Moment>
          </li>
          <li>3 Guests</li>
          <SearchIcon />
        </div>
        <div className={showMenu ? "nav__menu show__menu" : "nav__menu"}>
          <ul className="nav__list">
            <li className="nav__item">
              <Button>
                <NavLink className="nav__link" exact to="/">
                  Host your home
                </NavLink>
              </Button>
            </li>
            <li className="nav__item">
              <Button>
                <NavLink className="nav__link" exact to="/">
                  Host your experiance
                </NavLink>
              </Button>
            </li>
            <li className="nav__item">
              <Button>
                <NavLink className="nav__link" exact to="/">
                  Help
                </NavLink>
              </Button>
            </li>
          </ul>

          <div className="signup__button">
            <Button onClick={handleRoute}>Sign up</Button>
          </div>
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

/* {(window.location.pathname === "/result" ||
          window.location.pathname === `/details/${id}`) && (
          <div className="header__search_result">
            <li>{locationName}</li>
            <li>
              <Moment format="MMM DD">{checkIn}</Moment>-
              <Moment format="DD">{checkOut}</Moment>
            </li>
            <li>{guestCount} Guests</li>
            <SearchIcon />
          </div>
        )} */

/* {loggedInUser && loggedInUser.email ? (
              <div className="logout__button">
                <Avatar alt="A" src={loggedInUser.photoURL} />
                <Button onClick={userLogOut}>Login Out</Button>
              </div>
            ) : (
              <div className="signup__button">
                <Button onClick={handleRoute}>Sign up</Button>
              </div>
            )} */
