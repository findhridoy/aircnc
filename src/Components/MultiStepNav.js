import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";
import { NavLink } from "react-router-dom";

const MultiStepNav = ({ step1, step2, step3 }) => {
  return (
    <div className="multiStepNav">
      {step1 ? (
        <NavLink className="multiStepNav__link" to="/confirm/rules">
          1. Review<span>house rules</span> <ArrowForwardIosIcon />
        </NavLink>
      ) : (
        <button type="button" disabled>
          1. Review<span>house rules</span> <ArrowForwardIosIcon />
        </button>
      )}

      {step2 ? (
        <NavLink className="multiStepNav__link" to="/confirm/who'sComming">
          2. Who's<span>coming?</span> <ArrowForwardIosIcon />
        </NavLink>
      ) : (
        <button type="button" disabled>
          2. Who's<span>coming?</span> <ArrowForwardIosIcon />
        </button>
      )}

      {step3 ? (
        <NavLink className="multiStepNav__link" to="/confirm/confirm&pay">
          3. Confirm<span>and pay</span> <ArrowForwardIosIcon />
        </NavLink>
      ) : (
        <button type="button" disabled>
          3. Confirm<span>and pay</span> <ArrowForwardIosIcon />
        </button>
      )}
    </div>
  );
};

export default MultiStepNav;
