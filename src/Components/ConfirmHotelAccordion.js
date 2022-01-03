import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Moment from "react-moment";
import data from "../Data/Data";

function ConfirmHotelAccordion({ price }) {
  // const [data, setdata] = useState({});
  // useEffect(() => {
  //   setdata(result);
  // }, [result]);
  const { guestCount, checkIn, checkOut } = data;
  let diffDate = new Date(checkOut - checkIn);
  return (
    <>
      <div className="confirmHotel__dates">
        <p className="confirmHotel__date">Dates</p>
        <div className="confirmHotel__date_box">
          <p>
            <Moment format="D/MM/YYYY">{checkIn}</Moment>
          </p>
          <ArrowForwardIcon />
          <p>
            <Moment format="D/MM/YYYY">{checkOut}</Moment>
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
              <p>{guestCount} guests</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="confirmHotel__perNightPrice">
                <p>
                  ${price} x {diffDate.getUTCDate() - 1} nights
                </p>
                <p>$ {price * (diffDate.getUTCDate() - 1)}</p>
              </div>
              <div className="confirmHotel__cleaningFee">
                <p>Cleaning fee</p>
                <p>$10</p>
              </div>
              <div className="confirmHotel__serviceFee">
                <p>Service fee</p>
                <p>$21</p>
              </div>
              <div className="confirmHotel__totalPrice">
                <p>Total</p>
                <p>$ {price * (diffDate.getUTCDate() - 1) + 10 + 21}</p>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default ConfirmHotelAccordion;
