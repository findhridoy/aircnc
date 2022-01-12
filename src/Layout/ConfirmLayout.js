import React from "react";
import ConfirmHotelCard from "../Components/ConfirmHotelCard";

const ConfirmLayout = ({ children }) => {
  return (
    <section className="confirmLayout__section">
      <div className="container">
        <div className="confirmLayout__content">
          <div className="confirmLayout__multistep--section">{children}</div>
          <div className="confirmLayout__hotel--card">
            <ConfirmHotelCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmLayout;
