import React from "react";
import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <h5>
        Go <NavLink to="/">Home</NavLink>
      </h5>
    </div>
  );
}

export default PageNotFound;
