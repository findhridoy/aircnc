import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Moment from "react-moment";
import { useAuth } from "../Context/AuthContext";

function ConfirmHotelAccordion({ price }) {
  const { locationData } = useAuth();

  let diffDate = new Date(locationData?.checkOut - locationData?.checkIn);
  return (
    <>
      <div className="confirmHotel__dates">
        <p className="confirmHotel__date">Dates</p>
        <div className="confirmHotel__date_box">
          <p>
            <Moment format="D/MM/YYYY">{locationData?.checkIn}</Moment>
          </p>
          <ArrowForwardIcon />
          <p>
            <Moment format="D/MM/YYYY">{locationData?.checkOut}</Moment>
          </p>
        </div>
      </div>
      <div className="confirmHotel__guests">
        <p className="confirmHotel__guest">Guests</p>
        <div className="confrimHotel__accordion">
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel2a-header"
            >
              <p>{locationData?.guestCount} guests</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="confirmHotel__perNightPrice">
                <p>
                  ${price} x {locationData ? diffDate.getUTCDate() - 1 : 0}{" "}
                  nights
                </p>
                <p>
                  $ {price * (locationData ? diffDate.getUTCDate() - 1 : 0)}
                </p>
              </div>
              <div className="confirmHotel__cleaningFee">
                <p>Cleaning fee</p>
                <p>$ {locationData ? 10 : 0}</p>
              </div>
              <div className="confirmHotel__serviceFee">
                <p>Service fee</p>
                <p>$ {locationData ? 21 : 0}</p>
              </div>
              <div className="confirmHotel__totalPrice">
                <p>Total</p>
                <p>
                  $
                  {price * (locationData ? diffDate.getUTCDate() - 1 : 0) +
                    (locationData ? 10 : 0) +
                    (locationData ? 10 : 0)}
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default ConfirmHotelAccordion;
