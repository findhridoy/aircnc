import Button from "@material-ui/core/Button";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PetsIcon from "@material-ui/icons/Pets";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import WarningIcon from "@material-ui/icons/Warning";
import React, { useState } from "react";
import Moment from "react-moment";
import { useHistory, useParams } from "react-router-dom";
import MultiStepNav from "../Components/MultiStepNav";
import ConfirmLayout from "../Layout/ConfirmLayout";

function ReviewHouseRules() {
  let locationData = JSON.parse(sessionStorage.getItem("locationData"));

  let diffDate = new Date(locationData?.checkOut - locationData?.checkIn);

  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const { id } = useParams();
  const history = useHistory();
  return (
    <ConfirmLayout>
      <MultiStepNav step1 />
      <div className="reviewHouse">
        <h2>Review house rules</h2>
        <div className="reviewHouse__stayDetails">
          <h4>
            {locationData ? diffDate.getUTCDate() - 1 : 0} nights in
            {locationData?.locationName.slice(0, 12)}...
          </h4>
          <div className="reviewHouse__date">
            <div className="reviewHouse__fromDate">
              <div className="fromDate__date">
                <p>
                  <Moment format="MMM">{locationData?.checkIn}</Moment>
                </p>
                <p>
                  <Moment format="DD">{locationData?.checkIn}</Moment>
                </p>
              </div>
              <div className="fromDate__day_time">
                <p>
                  <Moment format="dddd">{locationData?.checkIn}</Moment>{" "}
                  check-in
                </p>
                <p>
                  After <Moment format="LT">{locationData?.checkIn}</Moment>
                </p>
              </div>
            </div>
            <div className="reviewHouse__toDate">
              <div className="toDate__date">
                <p>
                  <Moment format="MMM">{locationData?.checkOut}</Moment>
                </p>
                <p>
                  <Moment format="DD">{locationData?.checkOut}</Moment>
                </p>
              </div>
              <div className="toDate__day_time">
                <p>
                  <Moment format="dddd">{locationData?.checkOut}</Moment>{" "}
                  check-out
                </p>
                <p>
                  After <Moment format="LT">{locationData?.checkOut}</Moment>
                </p>
              </div>
            </div>
          </div>
          <p className="self__checkin">Self check-in with building staff</p>
        </div>
        <div className="reviewHouse__rules">
          <h4>Things to keep in mind</h4>
          <ul>
            <li>
              <ChildFriendlyIcon />
              Suiitable for children and infants
            </li>
            <li>
              <PetsIcon />
              Pets allowed
            </li>
            <li>
              <WarningIcon />
              No parties or events
            </li>
            <li>
              <SmokingRoomsIcon />
              Smoking allowed
            </li>

            {readMore ? (
              <div>
                <li>
                  <ChildFriendlyIcon />
                  Suiitable for children and infants
                </li>
                <li>
                  <PetsIcon />
                  Pets allowed
                </li>
              </div>
            ) : (
              ""
            )}
            <button onClick={handleReadMore}>
              {readMore ? (
                <span>
                  Read less
                  <ExpandLessIcon />
                </span>
              ) : (
                <span>
                  Read more
                  <ExpandMoreIcon />
                </span>
              )}
            </button>
          </ul>
          <Button
            onClick={() => history.push(`/confirm/who'sComming/${id}`)}
            variant="contained"
          >
            Agree and continue
          </Button>
        </div>
      </div>
    </ConfirmLayout>
  );
}

export default ReviewHouseRules;
